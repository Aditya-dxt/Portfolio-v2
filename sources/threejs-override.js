import * as THREE from 'three/webgpu'

THREE.Object3D.prototype.copy = function( source, recursive = true )
{
    this.name = source.name;

    this.up.copy( source.up );

    this.position.copy( source.position );
    this.rotation.order = source.rotation.order;
    this.quaternion.copy( source.quaternion );
    this.scale.copy( source.scale );

    this.matrix.copy( source.matrix );
    this.matrixWorld.copy( source.matrixWorld );

    this.matrixAutoUpdate = source.matrixAutoUpdate;

    this.matrixWorldAutoUpdate = source.matrixWorldAutoUpdate;
    this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

    this.layers.mask = source.layers.mask;
    this.visible = source.visible;

    this.castShadow = source.castShadow;
    this.receiveShadow = source.receiveShadow;

    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;

    this.animations = source.animations.slice();

    // this.userData = JSON.parse( JSON.stringify( source.userData ) );

    if ( recursive === true ) {

        for ( let i = 0; i < source.children.length; i ++ ) {

            const child = source.children[ i ];
            this.add( child.clone() );

        }

    }

    return this;

}

// WebGPU Native Validation Guard for Chrome / Edge / WebGPU Browsers
// Prevents "TypeError: Failed to execute 'drawIndexed' on 'GPURenderPassEncoder': Value is not of type 'unsigned long'"
// when Three.js passes NaN, Infinity, or uninitialized indices/instances during render passes.
if(typeof window !== 'undefined')
{
    if(typeof GPURenderPassEncoder !== 'undefined' && GPURenderPassEncoder.prototype.drawIndexed)
    {
        const origDrawIndexed = GPURenderPassEncoder.prototype.drawIndexed
        GPURenderPassEncoder.prototype.drawIndexed = function(indexCount, instanceCount = 1, firstIndex = 0, baseVertex = 0, firstInstance = 0)
        {
            if(!Number.isFinite(indexCount) || indexCount <= 0) return
            if(!Number.isFinite(instanceCount) || instanceCount <= 0) instanceCount = 1
            if(!Number.isFinite(firstIndex) || firstIndex < 0) firstIndex = 0
            if(!Number.isFinite(baseVertex)) baseVertex = 0
            if(!Number.isFinite(firstInstance) || firstInstance < 0) firstInstance = 0

            return origDrawIndexed.call(
                this,
                Math.floor(indexCount),
                Math.floor(instanceCount),
                Math.floor(firstIndex),
                Math.floor(baseVertex),
                Math.floor(firstInstance)
            )
        }

        const origDraw = GPURenderPassEncoder.prototype.draw
        GPURenderPassEncoder.prototype.draw = function(vertexCount, instanceCount = 1, firstVertex = 0, firstInstance = 0)
        {
            if(!Number.isFinite(vertexCount) || vertexCount <= 0) return
            if(!Number.isFinite(instanceCount) || instanceCount <= 0) instanceCount = 1
            if(!Number.isFinite(firstVertex) || firstVertex < 0) firstVertex = 0
            if(!Number.isFinite(firstInstance) || firstInstance < 0) firstInstance = 0

            return origDraw.call(
                this,
                Math.floor(vertexCount),
                Math.floor(instanceCount),
                Math.floor(firstVertex),
                Math.floor(firstInstance)
            )
        }
    }

    if(typeof GPURenderBundleEncoder !== 'undefined' && GPURenderBundleEncoder.prototype.drawIndexed)
    {
        const origBundleDrawIndexed = GPURenderBundleEncoder.prototype.drawIndexed
        GPURenderBundleEncoder.prototype.drawIndexed = function(indexCount, instanceCount = 1, firstIndex = 0, baseVertex = 0, firstInstance = 0)
        {
            if(!Number.isFinite(indexCount) || indexCount <= 0) return
            if(!Number.isFinite(instanceCount) || instanceCount <= 0) instanceCount = 1
            if(!Number.isFinite(firstIndex) || firstIndex < 0) firstIndex = 0
            if(!Number.isFinite(baseVertex)) baseVertex = 0
            if(!Number.isFinite(firstInstance) || firstInstance < 0) firstInstance = 0

            return origBundleDrawIndexed.call(
                this,
                Math.floor(indexCount),
                Math.floor(instanceCount),
                Math.floor(firstIndex),
                Math.floor(baseVertex),
                Math.floor(firstInstance)
            )
        }

        const origBundleDraw = GPURenderBundleEncoder.prototype.draw
        GPURenderBundleEncoder.prototype.draw = function(vertexCount, instanceCount = 1, firstVertex = 0, firstInstance = 0)
        {
            if(!Number.isFinite(vertexCount) || vertexCount <= 0) return
            if(!Number.isFinite(instanceCount) || instanceCount <= 0) instanceCount = 1
            if(!Number.isFinite(firstVertex) || firstVertex < 0) firstVertex = 0
            if(!Number.isFinite(firstInstance) || firstInstance < 0) firstInstance = 0

            return origBundleDraw.call(
                this,
                Math.floor(vertexCount),
                Math.floor(instanceCount),
                Math.floor(firstVertex),
                Math.floor(firstInstance)
            )
        }
    }
}
