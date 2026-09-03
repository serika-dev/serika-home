'use client';

import type { CSSProperties } from 'react';
import { motion, type MotionValue } from 'framer-motion';

/**
 * A low-poly figure built from actual cuboids, not capsules. Each limb is a
 * box with six faces at different brightness, so a yaw reads as a solid
 * turning in space instead of a stack of purple pills.
 */
function shade(t: number) {
  const a = [196, 181, 253];
  const b = [46, 16, 92];
  const r = Math.round(a[0] + (b[0] - a[0]) * (1 - t));
  const g = Math.round(a[1] + (b[1] - a[1]) * (1 - t));
  const bl = Math.round(a[2] + (b[2] - a[2]) * (1 - t));
  return `rgb(${r}, ${g}, ${bl})`;
}

function Cuboid({
  w,
  h,
  d,
  x = 0,
  y = 0,
  z = 0,
  rx = 0,
  ry = 0,
  rz = 0,
  origin = 'center',
  ink,
}: {
  w: number;
  h: number;
  d: number;
  x?: number;
  y?: number;
  z?: number;
  rx?: number;
  ry?: number;
  rz?: number;
  origin?: string;
  ink?: string;
}) {
  const hw = w / 2;
  const hh = h / 2;
  const hd = d / 2;
  const paint = (t: number) => ink ?? shade(t);
  const face = (background: string, transform: string, extra?: CSSProperties) => (
    <span
      className="absolute"
      style={{
        background,
        transform,
        backfaceVisibility: 'hidden',
        ...extra,
      }}
    />
  );

  return (
    <div
      className="preserve-3d absolute left-1/2 top-0"
      style={{
        width: `${w}rem`,
        height: `${h}rem`,
        marginLeft: `${-hw}rem`,
        transformOrigin: origin,
        transform: `translate3d(${x}rem, ${y}rem, ${z}rem) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
      }}
    >
      {face(paint(0.92), `translateZ(${hd}rem)`, {
        left: 0,
        top: 0,
        width: `${w}rem`,
        height: `${h}rem`,
      })}
      {face(paint(0.38), `rotateY(180deg) translateZ(${hd}rem)`, {
        left: 0,
        top: 0,
        width: `${w}rem`,
        height: `${h}rem`,
      })}
      {face(paint(0.7), `rotateY(90deg) translateZ(${hw}rem)`, {
        top: 0,
        left: `${hw - hd}rem`,
        width: `${d}rem`,
        height: `${h}rem`,
      })}
      {face(paint(0.55), `rotateY(-90deg) translateZ(${hw}rem)`, {
        top: 0,
        left: `${hw - hd}rem`,
        width: `${d}rem`,
        height: `${h}rem`,
      })}
      {face(paint(1), `rotateX(90deg) translateZ(${hh}rem)`, {
        left: 0,
        top: `${hh - hd}rem`,
        width: `${w}rem`,
        height: `${d}rem`,
      })}
      {face(paint(0.28), `rotateX(-90deg) translateZ(${hh}rem)`, {
        left: 0,
        top: `${hh - hd}rem`,
        width: `${w}rem`,
        height: `${d}rem`,
      })}
    </div>
  );
}

export function Avatar3D({
  turn,
  bob,
}: {
  turn: MotionValue<number>;
  bob: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="preserve-3d relative h-[16rem] w-[10rem] sm:h-[20rem] sm:w-[12rem]"
      style={{ rotateY: turn, y: bob }}
    >
      {/* Head. Slightly taller than it is wide, not a ball. */}
      <Cuboid w={2.15} h={2.35} d={2.05} y={0.05} z={0.35} />
      {/* Visor. A dark slab on the face, the only feature that says "front". */}
      <Cuboid
        w={1.7}
        h={0.55}
        d={0.35}
        y={0.85}
        z={1.28}
        ink="rgb(12, 12, 18)"
      />
      {/* Ear plates, so the silhouette is a head and not a brick. */}
      <Cuboid w={0.28} h={0.7} d={0.7} x={-1.15} y={0.7} z={0.2} />
      <Cuboid w={0.28} h={0.7} d={0.7} x={1.15} y={0.7} z={0.2} />

      <Cuboid w={0.7} h={0.45} d={0.7} y={2.35} z={0.15} />

      {/* Torso. Wide at the chest, a separate hip so there is a waist. */}
      <Cuboid w={3.35} h={3.55} d={1.85} y={2.75} z={0.1} />
      <Cuboid w={2.55} h={1.25} d={1.65} y={6.2} z={0.05} />

      {/* Leading arm, hinged forward. This is the one doing the shoving. */}
      <div
        className="preserve-3d absolute left-1/2 top-0"
        style={{
          transform:
            'translate3d(1.55rem, 2.95rem, 0.55rem) rotateZ(-78deg) rotateX(-18deg)',
          transformOrigin: 'top center',
        }}
      >
        <Cuboid w={0.78} h={2.35} d={0.78} origin="top center" />
        <div
          className="preserve-3d absolute left-1/2 top-0"
          style={{
            transform: 'translate3d(0, 2.25rem, 0) rotateZ(-22deg)',
            transformOrigin: 'top center',
          }}
        >
          <Cuboid w={0.68} h={2.15} d={0.68} origin="top center" />
          <Cuboid w={0.95} h={0.7} d={1.15} y={2.05} z={0.25} />
        </div>
      </div>

      {/* Trailing arm, tucked behind. */}
      <div
        className="preserve-3d absolute left-1/2 top-0"
        style={{
          transform:
            'translate3d(-1.55rem, 3.05rem, -0.35rem) rotateZ(28deg) rotateY(18deg)',
          transformOrigin: 'top center',
        }}
      >
        <Cuboid w={0.72} h={2.2} d={0.72} origin="top center" />
        <div
          className="preserve-3d absolute left-1/2 top-0"
          style={{
            transform: 'translate3d(0, 2.1rem, 0) rotateZ(16deg)',
            transformOrigin: 'top center',
          }}
        >
          <Cuboid w={0.62} h={2.0} d={0.62} origin="top center" />
          <Cuboid w={0.7} h={0.55} d={0.7} y={1.9} />
        </div>
      </div>

      {/* Legs. One planted, one mid-stride. */}
      <div
        className="preserve-3d absolute left-1/2 top-0"
        style={{
          transform: 'translate3d(-0.7rem, 7.35rem, 0.25rem) rotateZ(8deg)',
          transformOrigin: 'top center',
        }}
      >
        <Cuboid w={0.85} h={2.55} d={0.95} origin="top center" />
        <div
          className="preserve-3d absolute left-1/2 top-0"
          style={{
            transform: 'translate3d(0, 2.45rem, 0) rotateZ(-4deg)',
            transformOrigin: 'top center',
          }}
        >
          <Cuboid w={0.75} h={2.35} d={0.85} origin="top center" />
          <Cuboid w={0.95} h={0.4} d={1.35} y={2.25} z={0.2} />
        </div>
      </div>
      <div
        className="preserve-3d absolute left-1/2 top-0"
        style={{
          transform: 'translate3d(0.75rem, 7.35rem, -0.2rem) rotateZ(-10deg)',
          transformOrigin: 'top center',
        }}
      >
        <Cuboid w={0.85} h={2.45} d={0.95} origin="top center" />
        <div
          className="preserve-3d absolute left-1/2 top-0"
          style={{
            transform: 'translate3d(0, 2.35rem, 0) rotateZ(6deg)',
            transformOrigin: 'top center',
          }}
        >
          <Cuboid w={0.75} h={2.25} d={0.85} origin="top center" />
          <Cuboid w={0.95} h={0.4} d={1.25} y={2.15} z={0.15} />
        </div>
      </div>

      <div
        className="absolute left-1/2 top-[15.4rem] h-[1.1rem] w-[7.5rem] -translate-x-1/2 rounded-[100%] blur-md"
        style={{ background: 'rgba(91, 33, 182, 0.45)' }}
      />
    </motion.div>
  );
}
