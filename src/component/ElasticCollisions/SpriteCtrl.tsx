import React from "react";
import { SpriteCtrlProps } from "./model";

export const BallSpriteRenderCtrl = ({
  sprite,
  environment,
}: SpriteCtrlProps) => {
  return (
    <svg
      key={`sprite-container${sprite.name}`}
      width={sprite.size * 2}
      height={sprite.size * 2}
      x={sprite.position.x - sprite.size}
      y={environment.height - sprite.position.y - sprite.size}
    >
      <circle
        key={`sprite${sprite.name}`}
        cx={sprite.size}
        cy={sprite.size}
        r={sprite.size - 1}
        style={{
          fill: sprite.color,
          stroke: "black",
          strokeWidth: 1,
          opacity: 1,
        }}
      ></circle>
    </svg>
  );
};

export const CatSpriteRenderCtrl = ({
  sprite,
  environment,
}: SpriteCtrlProps) => {
  const center = sprite.size;

  return (
    <svg
      stroke-width="1"
      key={`sprite-container${sprite.name}`}
      width={sprite.size * 2}
      height={sprite.size * 2}
      x={sprite.position.x - sprite.size}
      y={environment.height - sprite.position.y - sprite.size}
    >
      <g transform={`rotate(${sprite.rotation} ${center} ${center})`}>
        <svg
          stroke={sprite.color}
          viewBox="-15 -15 130 150"
          style={{
            width: "100%",
          }}
        >
          <g>
            <path d="M53.79,29.73c1.54,0,2.78,1.25,2.78,2.78s-1.25,2.78-2.78,2.78S51,34.05,51,32.52S52.25,29.73,53.79,29.73 L53.79,29.73z M58.1,118.65l0.06,0h0.31c0.48-0.01,0.57-0.06,0.94-0.3l0.36-0.23c4.77-3.01,7.04-7.46,7.57-12.92 c0.56-5.8-0.8-12.77-3.26-20.4l0,0c-0.01-0.03-0.02-0.06-0.03-0.09L57.9,62.32c-0.6,0.26-1.19,0.51-1.79,0.75 c-2.35,0.98-4.77,1.71-7.24,2.22c-2.66,0.57-5.33,0.88-8.01,0.93c-5.72,0.09-11.44-1.04-17.17-3.4l-3.65,14.36 c-0.7,2.74-1.28,5.17-1.76,7.36c-0.51,2.32-0.97,4.58-1.39,6.88c-0.21,1.13-0.33,1.75-0.45,2.38c-1.33,6.85-2.74,14.15,1.09,19.9 c1.09,1.64,2.5,2.85,4.2,3.66c1.74,0.82,3.8,1.25,6.16,1.31c0.05,0,0.09,0,0.14,0h2.79V95.37c0-1.18,0.96-2.14,2.14-2.14 c1.18,0,2.14,0.96,2.14,2.14v23.28h11.49V95.37c0-1.18,0.96-2.14,2.14-2.14c1.18,0,2.14,0.96,2.14,2.14v23.28H58.1L58.1,118.65z M14.21,1.45l8.09,7.7c6-2.42,12.05-3.72,18.15-3.78c6.12-0.05,12.26,1.16,18.43,3.77l9.05-8.46c0.86-0.8,2.2-0.76,3,0.1 c0.38,0.41,0.57,0.93,0.57,1.44h0l0.11,18.06c2.46,4.3,3.92,8.31,4.53,12.07l3.63-1.18c1.12-0.36,2.32,0.25,2.69,1.37 c0.36,1.12-0.25,2.32-1.37,2.69l-4.61,1.5c0,0.1,0,0.2-0.01,0.29c-0.08,3.19-0.8,6.16-2.04,8.95l2.92,0.39 c1.17,0.15,1.99,1.22,1.84,2.39c-0.15,1.17-1.22,1.99-2.39,1.84l-4.59-0.61c-0.29,0.44-0.6,0.87-0.92,1.3 c-2.73,3.67-5.99,6.62-9.57,8.89l6.42,23.33h0c2.62,8.14,4.06,15.66,3.44,22.1c-0.49,5.13-2.25,9.56-5.69,13.05h10.46h0.11v0.01 c6.98,0,12.4,0,17.7-5.14c3.08-2.98,4.37-6.8,4.26-10.6c-0.06-2.08-0.55-4.17-1.39-6.13c-0.85-1.97-2.05-3.79-3.54-5.33 c-2.92-3.01-6.97-4.97-11.68-4.83c-1.17,0.03-2.15-0.89-2.19-2.07c-0.03-1.17,0.89-2.15,2.07-2.19c6-0.18,11.15,2.29,14.85,6.11 c1.87,1.93,3.36,4.19,4.4,6.62c1.04,2.43,1.65,5.06,1.72,7.7c0.15,4.93-1.53,9.88-5.54,13.77c-6.55,6.34-12.71,6.34-20.67,6.34 v0.01h-0.11H58.56l-0.2,0h-9.12c-0.17,0.04-0.35,0.07-0.53,0.07c-0.18,0-0.36-0.02-0.53-0.07h-14.7c-0.17,0.04-0.35,0.07-0.53,0.07 c-0.18,0-0.36-0.02-0.53-0.07h-4.4c-0.08,0-0.15,0-0.23-0.01c-2.97-0.07-5.61-0.63-7.89-1.71c-2.41-1.14-4.4-2.85-5.94-5.16 c-4.79-7.2-3.21-15.37-1.72-23.05c0.19-0.96,0.37-1.91,0.45-2.34c0.42-2.3,0.89-4.61,1.43-7.03c0.56-2.54,1.15-5.01,1.78-7.49 l3.91-15.37c-4.32-2.53-7.98-5.91-10.53-10.02C9.14,50.51,9,50.28,8.87,50.06l-3.45,0.43c-1.17,0.14-2.23-0.69-2.38-1.86 c-0.14-1.17,0.69-2.23,1.86-2.38l2.05-0.25c-1.08-2.92-1.64-6.11-1.59-9.53l-3.78-1.23c-1.12-0.36-1.73-1.57-1.37-2.69 c0.36-1.12,1.57-1.73,2.69-1.37l2.85,0.93c0.6-3.71,1.9-7.65,4.02-11.8l0.84-17.41c0.06-1.17,1.05-2.08,2.23-2.03 C13.38,0.89,13.85,1.11,14.21,1.45L14.21,1.45L14.21,1.45z M20.37,13.2l-5.73-5.45l-0.64,13.21l0,0c-0.01,0.3-0.09,0.6-0.24,0.88 c-2.16,4.13-3.41,8.01-3.89,11.6l13.38,4.34c1.12,0.36,1.73,1.57,1.37,2.69c-0.36,1.12-1.57,1.73-2.69,1.37L9.66,37.85 c0.11,2.74,0.7,5.28,1.67,7.59l11.01-1.37c1.17-0.14,2.23,0.69,2.38,1.86c0.14,1.17-0.69,2.24-1.86,2.38l-9.3,1.16 c2.23,3.2,5.31,5.85,8.89,7.87c4.01,2.26,8.65,3.72,13.5,4.28c4.29,0.5,8.72,0.28,12.99-0.71c1.64-0.4,3.28-0.91,4.92-1.53 c5.15-2.03,9.86-5.33,13.55-10.06l-7.62-1.02c-1.17-0.15-1.99-1.22-1.84-2.39c0.15-1.17,1.22-1.99,2.39-1.84l9.64,1.29 c1.18-2.28,1.93-4.68,2.16-7.24l-11.42,3.7c-1.12,0.36-2.32-0.25-2.69-1.37c-0.36-1.12,0.25-2.32,1.37-2.69l12.63-4.1 c-0.47-3.57-1.88-7.47-4.38-11.75h0c-0.18-0.31-0.29-0.68-0.29-1.07L67.28,7.11l-6.43,6.02c-0.61,0.64-1.58,0.85-2.43,0.47 c-6.02-2.74-12-4.01-17.94-3.96c-5.94,0.05-11.87,1.43-17.8,3.98l0,0C21.92,13.94,21.01,13.8,20.37,13.2L20.37,13.2z M37.54,39.46 c-1.18,0-2.14-0.96-2.14-2.14s0.96-2.14,2.14-2.14h6.61c1.18,0,2.14,0.96,2.14,2.14s-0.96,2.14-2.14,2.14h-1.2 c0.08,1.25,0.3,2.35,0.63,3.28c0.49,1.4,1.23,2.42,2.12,3.07c0.87,0.64,1.91,0.97,3.03,0.99c0.86,0.02,1.77-0.14,2.71-0.47 c1.11-0.39,2.33,0.19,2.72,1.3c0.39,1.11-0.19,2.33-1.3,2.72c-1.41,0.5-2.83,0.74-4.22,0.71c-2-0.04-3.87-0.63-5.46-1.81 c-0.79-0.59-1.51-1.31-2.13-2.17c-0.55,0.89-1.2,1.59-1.95,2.15c-2.49,1.85-5.65,1.86-9.07,1.38c-1.17-0.16-1.98-1.24-1.82-2.4 c0.16-1.17,1.24-1.98,2.4-1.82c2.44,0.34,4.61,0.41,5.93-0.58c1.2-0.9,1.98-2.8,2.09-6.35H37.54L37.54,39.46z M28.12,29.73 c1.54,0,2.78,1.25,2.78,2.78s-1.25,2.78-2.78,2.78c-1.54,0-2.78-1.25-2.78-2.78S26.58,29.73,28.12,29.73L28.12,29.73z" />
          </g>
        </svg>
      </g>

      <circle
        stroke-width="2"
        key={`sprite${sprite.name}`}
        cx={center}
        cy={center}
        r={sprite.size - 1}
        style={{
          fill: sprite.color,
          opacity: 0.5,
        }}
      ></circle>
    </svg>
  );
};
export const ManSpriteRenderCtrl = ({
  sprite,
  environment,
}: SpriteCtrlProps) => {
  const center = sprite.size;

  return (
    <svg
      stroke-width="1"
      key={`sprite-container${sprite.name}`}
      width={sprite.size * 2}
      height={sprite.size * 2}
      x={sprite.position.x - sprite.size}
      y={environment.height - sprite.position.y - sprite.size}
    >
      <g transform={`rotate(${sprite.rotation} ${center} ${center})`}>
        <svg
          stroke={sprite.color}
          viewBox="-7 -7 44 44"
          style={{
            width: "100%",
          }}
        >
          <line
            id="svg_35"
            y2="0.72734"
            x2="10.10516"
            y1="0.75238"
            x1="-0.01002"
          />
          <line
            id="svg_36"
            y2="0.72734"
            x2="30.01002"
            y1="0.75238"
            x1="19.89484"
          />
          <line
            id="svg_37"
            y2="2.20455"
            x2="19.89484"
            y1="2.22959"
            x1="10.08012"
          />
          <line
            id="svg_46"
            y2="3.68177"
            x2="10.08012"
            y1="3.70681"
            x1="-0.03505"
          />
          <line
            id="svg_47"
            y2="3.68177"
            x2="29.98498"
            y1="3.70681"
            x1="19.86981"
          />
          <line
            id="svg_48"
            y2="5.15899"
            x2="19.86981"
            y1="5.18402"
            x1="10.05508"
          />
          <line
            id="svg_49"
            y2="6.6362"
            x2="10.08012"
            y1="6.66124"
            x1="-0.03505"
          />
          <line
            id="svg_50"
            y2="6.6362"
            x2="29.98498"
            y1="6.66124"
            x1="19.86981"
          />
          <line
            id="svg_51"
            y2="8.11342"
            x2="19.86981"
            y1="8.13846"
            x1="10.05508"
          />
          <line
            id="svg_52"
            y2="9.61567"
            x2="10.08012"
            y1="9.64071"
            x1="-0.03505"
          />
          <line
            id="svg_53"
            y2="9.61567"
            x2="29.98498"
            y1="9.64071"
            x1="19.86981"
          />
          <line
            id="svg_54"
            y2="11.09289"
            x2="19.86981"
            y1="11.11793"
            x1="10.05508"
          />
          <line
            id="svg_55"
            y2="16.05033"
            x2="10.78117"
            y1="11.86905"
            x1="10.80621"
          />
          <line
            id="svg_56"
            y2="16.00025"
            x2="19.09364"
            y1="11.81898"
            x1="19.11868"
          />
          <line
            id="svg_57"
            y2="18.40386"
            x2="16.33951"
            y1="18.42889"
            x1="13.30997"
          />
          <line
            id="svg_58"
            y2="18.6292"
            x2="13.81072"
            y1="15.52454"
            x1="10.60591"
          />
          <line
            id="svg_59"
            y2="18.57935"
            x2="15.86379"
            y1="15.47513"
            x1="19.36928"
          />
          <line
            id="svg_60"
            y2="24.78844"
            x2="14.73711"
            y1="19.15498"
            x1="14.73711"
          />
          <line
            id="svg_61"
            y2="29.22008"
            x2="8.42764"
            y1="24.06235"
            x1="14.78718"
          />
          <line
            id="svg_62"
            y2="29.34527"
            x2="20.44567"
            y1="24.03731"
            x1="14.91237"
          />
          <line
            id="svg_64"
            y2="29.06986"
            x2="4.84727"
            y1="29.04482"
            x1="8.92839"
          />
          <line
            id="svg_66"
            y2="29.04482"
            x2="24.62694"
            y1="29.0949"
            x1="19.96996"
          />
          <line
            id="svg_67"
            y2="21.25814"
            x2="24.42664"
            y1="21.35829"
            x1="15.01252"
          />
          <line
            id="svg_68"
            y2="21.33325"
            x2="14.28643"
            y1="21.4334"
            x1="4.87231"
          />
          <line
            id="svg_69"
            y2="18.60416"
            x2="26.50476"
            y1="21.25814"
            x1="23.50025"
          />
          <line
            id="svg_70"
            y2="18.60416"
            x2="2.79419"
            y1="21.33325"
            x1="5.47321"
          />
          <line
            id="svg_71"
            y2="23.98723"
            x2="26.45469"
            y1="21.18303"
            x1="23.42514"
          />
          <line
            id="svg_72"
            y2="24.18753"
            x2="3.04456"
            y1="21.45844"
            x1="5.67351"
          />
          <line
            id="svg_73"
            y2="21.10791"
            x2="27.15574"
            y1="21.08288"
            x1="23.97597"
          />
          <line
            id="svg_74"
            y2="21.33325"
            x2="2.04306"
            y1="21.30821"
            x1="5.34802"
          />
          <line
            id="svg_75"
            y2="13.29619"
            x2="14.08613"
            y1="13.29619"
            x1="12.75914"
          />
          <line
            id="svg_76"
            y2="13.27116"
            x2="17.21583"
            y1="13.27116"
            x1="15.88883"
          />
          <line
            id="svg_77"
            y2="16.02529"
            x2="16.23936"
            y1="16.02529"
            x1="13.38508"
          />
        </svg>
      </g>

      <circle
        stroke-width="2"
        key={`sprite${sprite.name}`}
        cx={center}
        cy={center}
        r={sprite.size - 1}
        style={{
          fill: "none",
          stroke: sprite.color,
          opacity: 1,
        }}
      ></circle>
    </svg>
  );
};
