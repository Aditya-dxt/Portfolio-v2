import * as THREE from 'three/webgpu'
import { cameraPosition, positionWorld, color, float, Fn, instancedArray, mix, normalWorld, positionGeometry, step, texture, uniform, uv, vec2, vec3, vec4 } from 'three/tsl'
import { Inputs } from '../../Inputs/Inputs.js'
import { InteractivePoints } from '../../InteractivePoints.js'
import { Area } from './Area.js'
import gsap from 'gsap'
import { MeshDefaultMaterial } from '../../Materials/MeshDefaultMaterial.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import fontData from '../../../data/font.json'

export class LandingArea extends Area
{
    constructor(model)
    {
        super(model)

        this.localTime = uniform(0)

        this.setLetters()
        this.setKiosk()
        this.setControls()
        // this.setBonfire()
        this.setAchievement()
    }

    setObjects()
    {
        for(let i = this.model.children.length - 1; i >= 0; i--)
        {
            const child = this.model.children[i]
            if(child.name.toLowerCase().includes('letter'))
            {
                this.model.remove(child)
            }
        }
        super.setObjects()
    }

    setLetters()
    {
        const loader = new FontLoader()
        const font = loader.parse(fontData)
        
        const letterMaterial = new MeshDefaultMaterial({
            colorNode: Fn(() => {
                const viewDirection = positionWorld.sub(cameraPosition).normalize()
                const fresnel = viewDirection.dot(normalWorld).remapClamp(-0.15, -0.45, 1, 0)
                const baseDark = color('#0d1829')
                const edgeNeon = color('#00f5ff').mul(3.0)
                return mix(baseDark, edgeNeon, fresnel)
            })(),
            hasWater: false
        })


        const words = ['ADITYA', 'DIXIT']
        const fontSize = 1.2
        const fontDepth = 0.40
        const letterSpacing = 0.22
        const wordSpacing = 0.75

        const letterRotation = new THREE.Quaternion(0, 0.2164396, 0, 0.976296)
        const centerWorld = new THREE.Vector3(-5.2106, 0, 3.0862).add(this.model.position)
        centerWorld.y = 0.64
        const axis = new THREE.Vector3(0.9063, 0, -0.4226)

        const letterDefs = []
        let totalLength = 0

        for(let w = 0; w < words.length; w++)
        {
            const word = words[w]
            if(w > 0)
                totalLength += wordSpacing

            for(let i = 0; i < word.length; i++)
            {
                const char = word[i]
                const geo = new TextGeometry(char, {
                    font: font,
                    size: fontSize,
                    depth: fontDepth,
                    curveSegments: 3,
                    bevelEnabled: true,
                    bevelThickness: 0.025,
                    bevelSize: 0.015,
                    bevelSegments: 2
                })

                geo.computeBoundingBox()
                const width = geo.boundingBox.max.x - geo.boundingBox.min.x
                const height = geo.boundingBox.max.y - geo.boundingBox.min.y
                const depth = geo.boundingBox.max.z - geo.boundingBox.min.z

                geo.center()

                const uvAttr = geo.attributes.uv
                for(let u = 0; u < uvAttr.count; u++)
                {
                    uvAttr.setXY(u, 0.7356, 0.5)
                }
                uvAttr.needsUpdate = true
                geo.computeVertexNormals()

                letterDefs.push({
                    char,
                    geo,
                    width,
                    height,
                    depth,
                    centerOffset: totalLength + width / 2
                })

                totalLength += width + letterSpacing
            }
            totalLength -= letterSpacing
        }

        const halfLength = totalLength / 2

        for(const def of letterDefs)
        {
            const offset = def.centerOffset - halfLength
            const position = centerWorld.clone().add(axis.clone().multiplyScalar(offset))

            const letterMesh = new THREE.Mesh(def.geo, letterMaterial)
            letterMesh.castShadow = true
            letterMesh.receiveShadow = true

            const object = this.game.objects.add(
                {
                    model: letterMesh,
                    updateMaterials: false,
                    castShadow: true,
                    receiveShadow: true
                },
                {
                    type: 'dynamic',
                    position: position,
                    rotation: letterRotation,
                    mass: 0.2,
                    sleeping: true,
                    colliders: [
                        {
                            shape: 'cuboid',
                            parameters: [ def.width * 0.5, def.height * 0.5, def.depth * 0.5 ]
                        }
                    ]
                }
            )

            this.objects.items.push(object)

            const physical = object.physical
            if(physical && physical.colliders && physical.colliders[0])
            {
                physical.colliders[0].setActiveEvents(this.game.RAPIER.ActiveEvents.CONTACT_FORCE_EVENTS)
                physical.colliders[0].setContactForceEventThreshold(5)
                physical.onCollision = (force, pos) =>
                {
                    this.game.audio.groups.get('hitBrick').playRandomNext(force, pos)
                }
            }
        }
    }

    setKiosk()
    {
        // Interactive point
        const interactivePoint = this.game.interactivePoints.create(
            this.references.items.get('kioskInteractivePoint')[0].position,
            'Map',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () =>
            {
                this.game.inputs.interactiveButtons.clearItems()
                this.game.modals.open('map')
                // interactivePoint.hide()
            },
            () =>
            {
                this.game.inputs.interactiveButtons.addItems(['interact'])
            },
            () =>
            {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            },
            () =>
            {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            }
        )

        // this.game.map.items.get('map').events.on('close', () =>
        // {
        //     interactivePoint.show()
        // })
    }

    setControls()
    {
        // Interactive point
        const interactivePoint = this.game.interactivePoints.create(
            this.references.items.get('controlsInteractivePoint')[0].position,
            'Controls',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () =>
            {
                this.game.inputs.interactiveButtons.clearItems()
                this.game.menu.open('controls')
                interactivePoint.hide()
            },
            () =>
            {
                this.game.inputs.interactiveButtons.addItems(['interact'])
            },
            () =>
            {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            },
            () =>
            {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            }
        )

        // Menu instance
        const menuInstance = this.game.menu.items.get('controls')

        menuInstance.events.on('close', () =>
        {
            interactivePoint.show()
        })

        menuInstance.events.on('open', () =>
        {
            if(this.game.inputs.mode === Inputs.MODE_GAMEPAD)
                menuInstance.tabs.goTo('gamepad')
            else if(this.game.inputs.mode === Inputs.MODE_MOUSEKEYBOARD)
                menuInstance.tabs.goTo('mouse-keyboard')
            else if(this.game.inputs.mode === Inputs.MODE_TOUCH)
                menuInstance.tabs.goTo('touch')
        })
    }

    setBonfire()
    {
        const position = this.references.items.get('bonfireHashes')[0].position

        // Particles
        let particles = null
        {
            const emissiveMaterial = this.game.materials.getFromName('emissiveOrangeRadialGradient')
    
            const count = 30
            const elevation = uniform(5)
            const positions = new Float32Array(count * 3)
            const scales = new Float32Array(count)
    
    
            for(let i = 0; i < count; i++)
            {
                const i3 = i * 3
    
                const angle = Math.PI * 2 * Math.random()
                const radius = Math.pow(Math.random(), 1.5) * 1
                positions[i3 + 0] = Math.cos(angle) * radius
                positions[i3 + 1] = Math.random()
                positions[i3 + 2] = Math.sin(angle) * radius
    
                scales[i] = 0.02 + Math.random() * 0.06
            }
            
            const positionAttribute = instancedArray(positions, 'vec3').toAttribute()
            const scaleAttribute = instancedArray(scales, 'float').toAttribute()
    
            const material = new THREE.SpriteNodeMaterial()
            material.outputNode = emissiveMaterial.outputNode
    
            const progress = float(0).toVar()
    
            material.positionNode = Fn(() =>
            {
                const newPosition = positionAttribute.toVar()
                progress.assign(newPosition.y.add(this.localTime.mul(newPosition.y)).fract())
    
                newPosition.y.assign(progress.mul(elevation))
                newPosition.xz.addAssign(this.game.wind.direction.mul(progress))
    
                const progressHide = step(0.8, progress).mul(100)
                newPosition.y.addAssign(progressHide)
                
                return newPosition
            })()
            material.scaleNode = Fn(() =>
            {
                const progressScale = progress.remapClamp(0.5, 1, 1, 0)
                return scaleAttribute.mul(progressScale)
            })()
    
            const geometry = new THREE.CircleGeometry(0.5, 8)
    
            particles = new THREE.Mesh(geometry, material)
            particles.visible = false
            particles.position.copy(position)
            particles.count = count
            this.game.scene.add(particles)
        }

        // Hashes
        {
            const alphaNode = Fn(() =>
            {
                const baseUv = uv(1)
                const distanceToCenter = baseUv.sub(0.5).length()
    
                const voronoi = texture(
                    this.game.noises.voronoi,
                    baseUv
                ).g
    
                voronoi.subAssign(distanceToCenter.remap(0, 0.5, 0.3, 0))
    
                return voronoi
            })()
    
            const material = new MeshDefaultMaterial({
                colorNode: color(0x6F6A87),
                alphaNode: alphaNode,
                hasWater: false,
                hasLightBounce: false
            })
    
            const mesh = this.references.items.get('bonfireHashes')[0]
            mesh.material = material
        }

        // Burn
        const burn = this.references.items.get('bonfireBurn')[0]
        burn.visible = false

        // Interactive point
        this.game.interactivePoints.create(
            this.references.items.get('bonfireInteractivePoint')[0].position,
            'Res(e)t',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () =>
            {
                this.game.reset()

                gsap.delayedCall(2, () =>
                {
                    // Bonfire
                    particles.visible = true
                    burn.visible = true
                    this.game.ticker.wait(2, () =>
                    {
                        particles.geometry.boundingSphere.center.y = 2
                        particles.geometry.boundingSphere.radius = 2
                    })

                    // Sound
                    this.game.audio.groups.get('campfire').items[0].positions.push(position)
                })
            },
            () =>
            {
                this.game.inputs.interactiveButtons.addItems(['interact'])
            },
            () =>
            {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            },
            () =>
            {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            }
        )
    }

    setAchievement()
    {
        this.events.on('boundingIn', () =>
        {
            this.game.achievements.setProgress('areas', 'landing')
        })
        this.events.on('boundingOut', () =>
        {
            this.game.achievements.setProgress('landingLeave', 1)
        })
    }

    update()
    {
        this.localTime.value += this.game.ticker.deltaScaled * 0.1
    }
}