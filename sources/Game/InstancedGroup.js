import * as THREE from 'three/webgpu'
import { Game } from './Game.js'

export class InstancedGroup
{
    constructor(references = [], group = null, autoUpdate = true)
    {
        this.game = Game.getInstance()

        this.references = references
        this.group = group
        this.count = this.references ? this.references.length : 0
        this.needsUpdate = false

        this.setMeshes()

        if(autoUpdate && this.count > 0)
        {
            this.game.ticker.events.on('tick', () =>
            {
                this.update()
            }, 13)
        }
        
        if(this.count > 0)
        {
            this.update()
        }
    }

    setMeshes()
    {
        this.meshes = []

        if(this.count <= 0 || !this.group)
        {
            return
        }

        this.group.traverse((_child) =>
        {
            if(_child.isMesh)
            {
                const mesh = {}

                _child.updateMatrix()
                _child.updateWorldMatrix()
                mesh.localMatrix = _child.matrix
                // mesh.localMatrix = _child.matrixWorld
                
                mesh.instance = new THREE.InstancedMesh(_child.geometry, _child.material, this.count)
                mesh.instance.name = _child.name
                mesh.instance.castShadow = _child.castShadow
                mesh.instance.receiveShadow = _child.receiveShadow
                mesh.instance.frustumCulled = _child.frustumCulled
                this.game.scene.add(mesh.instance)

                this.meshes.push(mesh)
            }
        })
    }

    static getReferencesFromChildren(children)
    {
        const references = []
        if(!children) return references
        
        for(const child of children)
        {
            const reference = new THREE.Object3D()
            reference.position.copy(child.position)
            reference.rotation.copy(child.rotation)
            reference.scale.copy(child.scale)
            reference.needsUpdate = true
            references.push(reference)
        }
        
        return references
    }

    static getBaseAndReferencesFromInstances(instances)
    {
        if(!instances || instances.length === 0)
        {
            return [ new THREE.Object3D(), [] ]
        }

        // Base
        const base = instances[0].clone()

        base.position.set(0, 0, 0)
        base.rotation.set(0, 0, 0)

        // References
        const references = InstancedGroup.getReferencesFromChildren(instances)
        
        return [ base, references ]
    }

    updateBoundings()
    {
        if(this.count <= 0) return

        for(const mesh of this.meshes)
            mesh.instance.computeBoundingSphere()
    }

    update()
    {
        if(this.count <= 0) return

        let updated = 0
        let i = 0
        for(const _reference of this.references)
        {
            if(this.needsUpdate || _reference.needsUpdate)
            {
                updated++
                _reference.needsUpdate = false
                _reference.updateMatrixWorld()

                for(const instancedMesh of this.meshes)
                {
                    const finalMatrix = instancedMesh.localMatrix.clone().premultiply(_reference.matrixWorld)
                    instancedMesh.instance.setMatrixAt(i, finalMatrix)
                }
            }

            i++
        }

        if(updated)
            for(const instancedMesh of this.meshes)
                instancedMesh.instance.instanceMatrix.needsUpdate = true

        this.needsUpdate = false
    }
}
