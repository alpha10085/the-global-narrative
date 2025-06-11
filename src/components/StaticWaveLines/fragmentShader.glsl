precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;
uniform int u_line_count;
uniform float u_line_width;
uniform float u_line_blur;

#define PI 3.14159265359

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= iResolution.x / iResolution.y;

  float color = 0.0;
  for (int i = 0; i < 100; i++) {
    if (i >= u_line_count) break;
    
    float f = float(i) / float(u_line_count);
    float y = -1.0 + 2.0 * f;
    float offset = sin(iTime + y * PI * uDistance + uMouse.x * 2.0) * uAmplitude;
    float d = abs(uv.y - (y + offset));
    color += smoothstep(u_line_width / iResolution.y, 0.0, d) * u_line_blur;
  }

  gl_FragColor = vec4(color * uColor, 1.0);
}
