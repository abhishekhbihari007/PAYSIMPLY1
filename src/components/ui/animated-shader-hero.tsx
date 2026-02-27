// FILE: src/components/ui/animated-shader-hero.tsx
// The background effect is driven by buildShaderSource(...) + useShaderBackground(...)

import React, { useRef, useEffect, useState } from "react";

export interface AnimatedShaderHeroProps {
  className?: string;
  children?: React.ReactNode;
  /**
   * Cloud / background color of the hero shader (RGB 0–1).
   * Default: PaySimply dark green (0.024, 0.25, 0.19).
   */
  shaderColors?: { r: number; g: number; b: number };
}

function buildShaderSource(colors: { r: number; g: number; b: number }): string {
  const { r, g, b } = colors;
  return `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  vec3 cloudColor=vec3(${r.toFixed(3)},${g.toFixed(3)},${b.toFixed(3)});
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,cloudColor*bg,d);
  }
  O=vec4(col,1);
}`;
}

function useShaderBackground(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  shaderSource: string
) {
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;
    const vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    let program: WebGLProgram | null = null;
    let vs: WebGLShader | null = null;
    let fs: WebGLShader | null = null;
    let buffer: WebGLBuffer | null = null;

    function compile(shader: WebGLShader, source: string) {
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
      }
    }

    function setup() {
      vs = gl.createShader(gl.VERTEX_SHADER)!;
      fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      compile(vs, vertexSrc);
      compile(fs, shaderSource);
      program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
      }
    }

    function init() {
      if (!program) return;
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program!, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    }

    let resolutionLoc: WebGLUniformLocation | null = null;
    let timeLoc: WebGLUniformLocation | null = null;
    function cacheUniforms() {
      if (!program) return;
      resolutionLoc = gl.getUniformLocation(program, "resolution");
      timeLoc = gl.getUniformLocation(program, "time");
    }

    function render(now = 0) {
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      if (resolutionLoc) gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      if (timeLoc) gl.uniform1f(timeLoc, now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    const resize = () => {
      const w = canvas.parentElement?.clientWidth ?? window.innerWidth;
      const h = canvas.parentElement?.clientHeight ?? window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    setup();
    init();
    cacheUniforms();
    resize();

    const loop = (now: number) => {
      render(now);
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    animationFrameRef.current = requestAnimationFrame(loop);

    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? document.body);

    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (program) {
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        gl.deleteProgram(program);
      }
    };
  }, [shaderSource]);
}

const defaultShaderColors = { r: 6 / 255, g: 64 / 255, b: 48 / 255 };

const AnimatedShaderHero: React.FC<AnimatedShaderHeroProps> = ({
  className = "",
  children,
  shaderColors,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const shaderSource = React.useMemo(
    () => buildShaderSource(shaderColors ?? defaultShaderColors),
    [shaderColors]
  );
  useShaderBackground(canvasRef, shaderSource);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2")) setWebglSupported(false);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden rounded-[24px] md:rounded-[32px] min-h-[calc(100vh-6.25rem-1rem)] ${className}`}>
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover touch-none select-none"
          style={{ background: "#064030" }}
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={{ background: "linear-gradient(135deg, #064030 0%, #0D4D3E 50%, #042E22 100%)" }}
          aria-hidden
        />
      )}
      {children}
    </div>
  );
};

export default AnimatedShaderHero;
