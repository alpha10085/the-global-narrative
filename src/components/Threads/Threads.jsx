"use client";
import { useEffect, useRef } from "react";
import styles from "./Threads.module.css";

function parseColorStringToRGBArray(colorString) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = colorString;
  const computed = ctx.fillStyle;

  const div = document.createElement("div");
  div.style.color = computed;
  document.body.appendChild(div);
  const rgb = window.getComputedStyle(div).color;
  document.body.removeChild(div);

  const match = rgb.match(/\d+/g);
  return match ? match.map((v) => parseInt(v, 10) / 255) : [1, 1, 1];
}

const vertexShaderSource = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;
uniform float uFade;

#define PI 3.1415926538
const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
  vec2 Pi = floor(P);
  vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
  vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
  Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
  Pt += vec2(26.0, 161.0).xyxy;
  Pt *= Pt;
  Pt = Pt.xzxz * Pt.yyww;
  vec4 hash_x = fract(Pt * (1.0 / 951.135664));
  vec4 hash_y = fract(Pt * (1.0 / 642.949883));
  vec4 grad_x = hash_x - 0.49999;
  vec4 grad_y = hash_y - 0.49999;
  vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
      * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
  grad_results *= 1.4142135623730950;
  vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
             * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
  vec4 blend2 = vec4(blend, vec2(1.0 - blend));
  return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
  return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
  float split_offset = (perc * 0.4);
  float split_point = 0.1 + split_offset;

  float amplitude_normal = smoothstep(split_point, 0.7, st.x);
  float amplitude_strength = 0.5;
  float finalAmplitude = amplitude_normal * amplitude_strength
                         * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

  float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
  float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

  float xnoise = mix(
      Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
      Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
      st.x * 0.3
  );

  float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

  float line_start = smoothstep(
      y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
      y,
      st.y
  );

  float line_end = smoothstep(
      y,
      y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
      st.y
  );

  float fadeAmount = 1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3));
  return clamp((line_start - line_end) * mix(1.0, fadeAmount, uFade), 0.0, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = fragCoord / iResolution.xy;
  float line_strength = 1.0;
  for (int i = 0; i < u_line_count; i++) {
    float p = float(i) / float(u_line_count);
    line_strength *= (1.0 - lineFn(
        uv,
        u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
        p,
        (PI * 1.0) * p,
        uMouse,
        iTime,
        uAmplitude,
        uDistance
    ));
  }
  float colorVal = 1.0 - line_strength;
  gl_FragColor = vec4(uColor * colorVal, colorVal);
}
`;

const Threads = ({ color = "white", amplitude = 1, distance = 0, fade = 1, ...rest }) => {
  const canvasRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    const rgbColor = parseColorStringToRGBArray(color);

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) return;

    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "iTime");
    const resLoc = gl.getUniformLocation(program, "iResolution");
    const colorLoc = gl.getUniformLocation(program, "uColor");
    const ampLoc = gl.getUniformLocation(program, "uAmplitude");
    const distLoc = gl.getUniformLocation(program, "uDistance");
    const mouseLoc = gl.getUniformLocation(program, "uMouse");
    const fadeLoc = gl.getUniformLocation(program, "uFade");

    function resize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    window.addEventListener("resize", resize);
    resize();

    let start = performance.now();
    function render() {
      const t = (performance.now() - start) * 0.001;
      gl.uniform1f(timeLoc, t);
      gl.uniform3f(
        resLoc,
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
        gl.drawingBufferWidth / gl.drawingBufferHeight
      );
      gl.uniform3f(colorLoc, ...rgbColor);
      gl.uniform1f(ampLoc, amplitude);
      gl.uniform1f(distLoc, distance);
      gl.uniform2f(mouseLoc, 0.5, 0.5);
      gl.uniform1f(fadeLoc, fade);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frameId.current = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(frameId.current);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      window.removeEventListener("resize", resize);
    };
  }, [color, amplitude, distance, fade]);

return (
  <canvas
    ref={canvasRef}
    className={`${styles.container} ${rest.className || ""}`}
    {...rest}
  />
);};

export default Threads;
