<!-- webGL page-->
<template>
    <div class="_webgl_page">
        <canvas id="webGL">
            Your browser doesn't appear to support the HTML5 <code>&lt;canvas&gt;</code> element.
        </canvas>
    </div>
</template>

<script>

    import {mat4} from 'gl-matrix'

    export default {
        name: 'WebGLPage',
        props: {},
        data() {
            return {
                webgl: null,
                vertexShader: null, //顶点着色器
                fragmentShader: null, //片元着色器
                vSource: null, //顶点着色器源码程序
                fSource: null, //片元着色器源码程序
                verticesBuffer: null,//webgl缓存
                shaderProgram: null,
            }
        },
        mounted() {
            //初始化webgl实例
            this.initWebGL();
            //初始化着色器实例
            this.initShaderProgram();
            //初始化webgl缓存实例
            this.initBuffers();
            //初始化场景
            this.initSence();
        },
        methods: {
            /**
             * @Description: init webGL
             * @author: lifei
             * @date: 2019/10/13
             */
            initWebGL() {
                let _this = this;
                //step1
                let canvas = document.querySelector("#webGL");
                _this.webgl = canvas.getContext("webgl");
                if (!_this.webgl) {
                    //alert("Unable to initialize WebGL. Your browser or machine may not support it.");
                    return;
                }
                //step2
                _this.webgl.clearColor(0.8, 0.8, 0.8, 1.0);
                _this.webgl.clear(_this.webgl.COLOR_BUFFER_BIT);

            },
            /**
             * @Description: 初始化着色器
             * @author: lifei
             * @date: 2019/10/15
             */
            initShaderProgram() {
                let _this = this;
                //step1 初始化顶点和片元着色器源码程序
                /**
                 *顶点着色器程序源码
                 * vec4 gl_Position:顶点的位置 必须赋值
                 * float gl_PointSize:顶点测尺寸  像素数 （默认）
                 */

                _this.vSource = `
                  attribute vec4 aVertexPosition;
                  uniform mat4 uModelViewMatrix;
                  uniform mat4 uProjectionMatrix;

                  void main(){
                     gl_Position=uProjectionMatrix * uModelViewMatrix * aVertexPosition;
                  }
               `;
                /**
                 *片元着色器程序源码
                 * gl_FragColor:颜色存储变量
                 *
                 */
                _this.fSource = `
                   void main() {
                      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
                   }
                `;

                //step2 初始化着色器
                //创建顶点着色器
                _this.vertexShader = _this.loadShader(_this.webgl.VERTEX_SHADER, _this.vSource);
                //创建片元着色器
                _this.fragmentShader = _this.loadShader(_this.webgl.FRAGMENT_SHADER, _this.fSource);
                //创建w ebGL着色器程序
                _this.shaderProgram = _this.webgl.createProgram();
                //添加预先定义好的顶点着色器和片元着色器
                _this.webgl.attachShader(_this.shaderProgram, _this.vertexShader);
                _this.webgl.attachShader(_this.shaderProgram, _this.fragmentShader);
                //链接一个给定的WebGLProgram 到已附着的顶点着色器和片元着色器。
                _this.webgl.linkProgram(_this.shaderProgram);
                // 创建失败 alert
                if (!_this.webgl.getProgramParameter(_this.shaderProgram, _this.webgl.LINK_STATUS)) {
                    alert('Unable to initialize the shader program: ' + _this.webgl.getProgramInfoLog(_this.shaderProgram));
                }
            },

            /**
             * @Description: 创建着色器实例
             * @author: lifei
             * @date: 2019/10/15
             */
            loadShader(type, source) {
                let _this = this;
                //step1 创建一个新的着色器。
                const shader = _this.webgl.createShader(type);
                //step2 将源代码发送到着色器。
                _this.webgl.shaderSource(shader, source);
                //step3 着色器获取到源代码，就使用gl.compileShader().进行编译
                _this.webgl.compileShader(shader);
                //step4 是否创建成功
                if (!_this.webgl.getShaderParameter(shader, _this.webgl.COMPILE_STATUS)) {
                    console.log('An error occurred compiling the shaders: ' + _this.webgl.getShaderInfoLog(shader));
                    _this.webgl.deleteShader(shader);
                    return null;
                }

                return shader;
            },

            /**
             * @Description: 创建webgl缓存
             * @author: lifei
             * @date: 2019/10/15
             */
            initBuffers() {
                let _this = this;
                //step1 获取缓存
                _this.verticesBuffer = _this.webgl.createBuffer();
                //step2 函数绑定上文
                _this.webgl.bindBuffer(_this.webgl.ARRAY_BUFFER, _this.verticesBuffer);

                //step3 创建顶点坐标
                let vertices = [
                    1.0, 1.0, 0.0,
                    -1.0, 1.0, 0.0,
                    1.0, -1.0, 0.0,
                    -1.0, -1.0, 0.0
                ];
                //step4  bufferData() 方法来建立对象的顶点
                _this.webgl.bufferData(_this.webgl.ARRAY_BUFFER, new Float32Array(vertices), _this.webgl.STATIC_DRAW);

            },

            /**
             * @Description: 初始化场景
             * @author: lifei
             * @date: 2019/10/15
             */
            initSence() {
                let _this = this;
                let programInfo = {
                    program: _this.shaderProgram,
                    attribLocations: {
                        vertexPosition: _this.webgl.getAttribLocation(_this.shaderProgram, 'aVertexPosition'),
                    },
                    uniformLocations: {
                        projectionMatrix: _this.webgl.getUniformLocation(_this.shaderProgram, 'uProjectionMatrix'),
                        modelViewMatrix: _this.webgl.getUniformLocation(_this.shaderProgram, 'uModelViewMatrix'),
                    },
                };

                _this.webgl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
                _this.webgl.clearDepth(1.0);                 // Clear everything
                _this.webgl.enable(_this.webgl.DEPTH_TEST);           // Enable depth testing
                _this.webgl.depthFunc(_this.webgl.LEQUAL);            // Near things obscure far things

                // Clear the canvas before we start drawing on it.

                _this.webgl.clear(_this.webgl.COLOR_BUFFER_BIT | _this.webgl.DEPTH_BUFFER_BIT);

                // Create a perspective matrix, a special matrix that is
                // used to simulate the distortion of perspective in a camera.
                // Our field of view is 45 degrees, with a width/height
                // ratio that matches the display size of the canvas
                // and we only want to see objects between 0.1 units
                // and 100 units away from the camera.

                const fieldOfView = 45 * Math.PI / 180;   // in radians
                const aspect = _this.webgl.canvas.clientWidth / _this.webgl.canvas.clientHeight;
                const zNear = 0.1;
                const zFar = 100.0;
                const projectionMatrix = mat4.create();

                // note: glmatrix.js always has the first argument
                // as the destination to receive the result.
                mat4.perspective(projectionMatrix,
                    fieldOfView,
                    aspect,
                    zNear,
                    zFar);

                // Set the drawing position to the "identity" point, which is
                // the center of the scene.
                const modelViewMatrix = mat4.create();

                // Now move the drawing position a bit to where we want to
                // start drawing the square.

                mat4.translate(modelViewMatrix,     // destination matrix
                    modelViewMatrix,     // matrix to translate
                    [-0.0, 0.0, -6.0]);  // amount to translate

                // Tell WebGL how to pull out the positions from the position
                // buffer into the vertexPosition attribute.
                {
                    const numComponents = 2;  // pull out 2 values per iteration
                    const type = _this.webgl.FLOAT;    // the data in the buffer is 32bit floats
                    const normalize = false;  // don't normalize
                    const stride = 0;         // how many bytes to get from one set of values to the next
                                              // 0 = use type and numComponents above
                    const offset = 0;         // how many bytes inside the buffer to start from
                    _this.webgl.bindBuffer(_this.webgl.ARRAY_BUFFER, _this.verticesBuffer);
                    _this.webgl.vertexAttribPointer(
                        programInfo.attribLocations.vertexPosition,
                        numComponents,
                        type,
                        normalize,
                        stride,
                        offset);
                    _this.webgl.enableVertexAttribArray(
                        programInfo.attribLocations.vertexPosition);
                }

                _this.webgl.useProgram(programInfo.program);
                _this.webgl.uniformMatrix4fv(
                    programInfo.uniformLocations.projectionMatrix,
                    false,
                    projectionMatrix);
                _this.webgl.uniformMatrix4fv(
                    programInfo.uniformLocations.modelViewMatrix,
                    false,
                    modelViewMatrix);

                {
                    const offset = 0;
                    const vertexCount = 4;
                    _this.webgl.drawArrays(_this.webgl.TRIANGLE_STRIP, offset, vertexCount);
                }
            }

        },
        destroyed() {
        }
    }
</script>


<style scoped lang="scss">
    ._webgl_page {
        width: 100%;
        height: 92%;

        #webGL {
            width: 100%;
            height: 100%;
        }
    }
</style>