import React from "react";
import styled from "styled-components";

const StyledLogo = styled.svg`
  .cls-1 {
    fill: #00d3e8;
  }

  .cls-1,
  .cls-2,
  .cls-3,
  .cls-4 {
    fill-rule: evenodd;
  }

  .cls-2 {
    fill: #a1b2b6;
  }

  .cls-3 {
    fill: #fff;
  }

  .cls-4 {
    fill: #344265;
  }
`;

const Logo: React.FC<{ className: string; logo?: boolean }> = ({
  className,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <StyledLogo
        className={className}
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 312.23 346.11">
        <g id="object">
          <g>
            <path
              className="cls-4"
              d="M32.09,146.26c-10.5-7.75-22.86-16.55-28.23-28.61C-8.61,90.24,11.21,16.51,33.28,1.97c4.79-3.16,16.81,1.56,12.75,11.95-5.49,12.95-11.48,31.58-6.52,45.55l.07,.2h.65c40.91-79.57,190.85-79.57,231.76,0h.65s.07-.2,.07-.2c4.96-13.97-1.03-32.61-6.52-45.55-4.06-10.39,7.95-15.1,12.75-11.95,22.07,14.54,41.89,88.27,29.42,115.68-5.37,12.06-17.72,20.86-28.23,28.61-4.32,11.37-11.51,21.49-19.99,30.19,40.88,40.16,36.51,111.68-32.64,97.12-14.43,17.86-17.14,34.31-42.91,41.29-9.29,16.25-4.65,26.37-28.49,31.26-23.84-4.89-19.2-15.01-28.49-31.26-25.77-6.98-28.48-23.42-42.91-41.29-69.15,14.56-73.53-56.96-32.64-97.12-8.47-8.7-15.66-18.82-19.99-30.19h0Zm124.03,7.2c-9.24,.13-17.97,3.45-26.86,6.84-14.93,5.68-30.32,11.54-50.23,3.95-8.35-3.18-15.56-9.58-20.7-17.92-5.51-8.95-8.65-20.15-8.24-32.03,.4-11.86,4.33-24.39,12.92-35.99,9.88-13.35,25.95-25.48,49.96-33.94,1.68-.53,3.94,.22,6.77,2.26-20.6,7.04-39.95,16.29-53.26,34.26-8.03,10.85-11.7,22.53-12.08,33.55-.37,11.01,2.52,21.37,7.6,29.63,.47,.76,.96,1.5,1.46,2.22,13.46,15.92,32.95,19.17,58.48,9.76,14.7-6.32,26.09-9.57,34.18-9.75,8.09,.18,19.48,3.43,34.18,9.75,25.53,9.41,45.02,6.16,58.48-9.76,.5-.72,.99-1.46,1.46-2.22,5.08-8.25,7.97-18.62,7.6-29.63-.38-11.03-4.04-22.7-12.08-33.55-13.3-17.97-32.65-27.22-53.26-34.26,2.83-2.04,5.09-2.79,6.77-2.26,24,8.46,40.07,20.59,49.96,33.94,8.59,11.61,12.52,24.14,12.92,35.99,.4,11.88-2.73,23.08-8.24,32.03-5.13,8.34-12.34,14.73-20.7,17.92-19.92,7.6-35.3,1.74-50.23-3.95-8.89-3.39-17.62-6.71-26.86-6.84h0Zm0-94.31c-9.58-.36-14.37-.54-14.37-.54-15.9-14.09-23.85-21.14-23.85-21.14-64.24,.44-100.54,91.01-47.13,129.3,24.55,17.61,54.94-.77,76.47-3.88,3.16-.45,6.14-.58,8.87-.22,3.53-.47,7.45-.13,11.67,.69,21.31,4.13,50.17,20.26,73.68,3.4,53.4-38.3,17.11-128.86-47.13-129.3,0,0-7.95,7.05-23.85,21.14,0,0-4.79,.18-14.37,.54h0Zm44.66,30.34c-8.53,0-15.45,6.92-15.45,15.45s6.92,15.45,15.45,15.45,15.45-6.92,15.45-15.45-6.92-15.45-15.45-15.45h0Zm-89.32,0c8.53,0,15.45,6.92,15.45,15.45s-6.92,15.45-15.45,15.45-15.45-6.92-15.45-15.45,6.92-15.45,15.45-15.45h0Zm-73.37,10.33c-6.22,73.16,52.22,103.39,118.03,106.23,65.82-2.84,124.25-33.07,118.03-106.23-10.26-120.74-225.81-120.74-236.06,0h0Zm118.03,112.38c-35.44-1.86-62.59-9.45-81.48-22.77-1.17,14.45-1.76,21.68-1.76,21.68,40.53-17.01,86.83,11.04,67.35,56.1,6.12,1.16,11.59,1.12,15.89,1.22,4.3-.1,9.77-.06,15.89-1.22-19.48-45.06,26.82-73.11,67.35-56.1,0,0-.59-7.23-1.76-21.68-18.88,13.32-46.04,20.91-81.48,22.77h0Zm0,63.56c-9.35-.51-16.21-1.32-20.6-2.44-24.98,11.28-26.24-1.96-38.76-.68,21.12,27.84,20.71,35.34,59.36,38.35,38.64-3.01,38.23-10.51,59.36-38.35-12.51-1.28-13.78,11.96-38.76,.68-4.39,1.12-11.25,1.93-20.6,2.44h0Zm0,42.42c-6.82-.45-12.87-1.34-18.16-2.68,5.39,9.42,3.58,18.72,18.16,21.79,14.58-3.07,12.77-12.37,18.16-21.79-5.29,1.34-11.34,2.23-18.16,2.68h0ZM290.31,68.88c-6.09-.61-13.95-.56-16.94-.54,8.28,16.59,11.42,40.74,7.66,64.98,10.66-7.64,16.99-13.7,18.97-18.16,5.44-33.83-1.78-68.97-21.68-105.43-2.37,.33-3.75,.61-4.13,.81,9.11,21.48,11.35,38.76,6.71,51.83,4.08,1.84,7.21,4.01,9.42,6.51h0Zm-73.88,143.84c9.23,7.38,13.12,20.8,11.65,40.25,12.74,2.8,19.11,4.2,19.11,4.2,.32,2.35-.22,4.7-1.63,7.05-16.48-2.06-30.05-2.64-40,.71-44.56,15.01-37.13-55.32,10.87-52.21h0Zm36.45,38.35c1.33,4.9,1.28,9.11-.13,12.6,31.33-5.61,29.55-50.03-2.1-81.24-1.7,1.51-3.71,3.22-6.03,5.15,1.79,8.77,2.51,17.42,2.17,25.95,9.76,6.98,14.91,16.29,15.45,27.92-3.91-15.06-16.02-24.32-36.32-27.78,7.27,6.82,10.7,17.58,10.3,32.25,8.15,1.85,13.7,3.57,16.67,5.15h0ZM21.93,68.88c6.09-.61,13.95-.56,16.94-.54-8.28,16.59-11.42,40.74-7.66,64.98-10.66-7.64-16.99-13.7-18.97-18.16-5.44-33.83,1.78-68.97,21.68-105.43,2.37,.33,3.75,.61,4.13,.81-9.11,21.48-11.35,38.76-6.71,51.83-4.07,1.84-7.21,4.01-9.42,6.51h0ZM95.81,212.72c-9.23,7.38-13.12,20.8-11.65,40.25-12.74,2.8-19.11,4.2-19.11,4.2-.32,2.35,.22,4.7,1.63,7.05,16.48-2.06,30.05-2.64,40,.71,44.56,15.01,37.13-55.32-10.87-52.21h0Zm-36.45,38.35c-1.33,4.9-1.28,9.11,.13,12.6-31.33-5.61-29.55-50.03,2.1-81.24,1.7,1.51,3.71,3.22,6.03,5.15-1.79,8.77-2.51,17.42-2.17,25.95-9.76,6.98-14.91,16.29-15.45,27.92,3.91-15.06,16.02-24.32,36.32-27.78-7.27,6.82-10.7,17.58-10.3,32.25-8.15,1.85-13.7,3.57-16.67,5.15h0Z"
            />
            <path
              className="cls-1"
              d="M111.46,89.48c8.53,0,15.45,6.92,15.45,15.45s-6.92,15.45-15.45,15.45-15.45-6.92-15.45-15.45,6.92-15.45,15.45-15.45h0Zm89.32,0c-8.53,0-15.45,6.92-15.45,15.45s6.92,15.45,15.45,15.45,15.45-6.92,15.45-15.45-6.92-15.45-15.45-15.45h0Z"
            />
            <path
              className="cls-3"
              d="M156.12,162.67c-21.35-2.86-57.19,24.29-85.35,4.09C17.36,128.46,53.66,37.9,117.9,37.46c0,0,7.95,7.05,23.85,21.14,0,0,4.79,.18,14.37,.54,9.58-.36,14.37-.54,14.37-.54,15.9-14.09,23.85-21.14,23.85-21.14,64.24,.44,100.54,91.01,47.13,129.3-28.16,20.19-64-6.96-85.35-4.09h0ZM21.93,68.88c6.09-.61,13.95-.56,16.94-.54-8.28,16.59-11.42,40.74-7.66,64.98-10.66-7.64-16.99-13.7-18.97-18.16-5.44-33.83,1.78-68.97,21.68-105.43,2.37,.33,3.75,.61,4.13,.81-9.11,21.48-11.35,38.76-6.71,51.83-4.07,1.84-7.21,4.01-9.42,6.51h0ZM216.42,212.72c9.23,7.38,13.12,20.8,11.65,40.25,12.74,2.8,19.11,4.2,19.11,4.2,.32,2.35-.22,4.7-1.63,7.05-16.48-2.06-30.05-2.64-40,.71-44.56,15.01-37.13-55.32,10.87-52.21h0Zm-60.31,55.7v-56.24c35.44-1.86,62.59-9.45,81.48-22.77,1.17,14.45,1.76,21.68,1.76,21.68-40.53-17.01-86.83,11.04-67.35,56.1-6.12,1.16-11.59,1.12-15.89,1.22h0Zm-60.3-55.7c-9.23,7.38-13.12,20.8-11.65,40.25-12.74,2.8-19.11,4.2-19.11,4.2-.32,2.35,.22,4.7,1.63,7.05,16.48-2.06,30.05-2.64,40,.71,44.56,15.01,37.13-55.32-10.87-52.21h0Zm60.3,98.25c-38.64-3.01-38.23-10.51-59.36-38.35,12.51-1.28,13.78,11.96,38.76,.68,4.39,1.12,11.25,1.93,20.6,2.44,9.35-.51,16.21-1.32,20.6-2.44,24.98,11.28,26.24-1.96,38.76-.68-21.12,27.84-20.71,35.34-59.36,38.35h0Zm0,26.29c14.58-3.07,12.77-12.37,18.16-21.79-5.29,1.34-11.34,2.23-18.16,2.68v19.11h0ZM290.31,68.88c-6.09-.61-13.95-.56-16.94-.54,8.28,16.59,11.42,40.74,7.66,64.98,10.66-7.64,16.99-13.7,18.97-18.16,5.44-33.83-1.78-68.97-21.68-105.43-2.37,.33-3.75,.61-4.13,.81,9.11,21.48,11.35,38.76,6.71,51.83,4.08,1.84,7.21,4.01,9.42,6.51h0ZM38.09,99.8c-6.22,73.16,52.22,103.39,118.03,106.23,65.82-2.84,124.25-33.07,118.03-106.23-10.26-120.74-225.81-120.74-236.06,0h0Zm21.27,151.27c2.96-1.58,8.52-3.3,16.67-5.15-.4-14.68,3.03-25.43,10.3-32.25-20.3,3.46-32.4,12.72-36.32,27.78,.54-11.63,5.69-20.94,15.45-27.92-.35-8.54,.38-17.19,2.17-25.95-2.32-1.93-4.33-3.64-6.03-5.15-31.65,31.21-33.43,75.63-2.1,81.24-1.42-3.5-1.46-7.7-.13-12.6h0Z"
            />
            <path
              className="cls-3"
              d="M156.12,337.26c-14.58-3.07-12.77-12.37-18.16-21.79,5.29,1.34,11.34,2.23,18.16,2.68v19.11h0Z"
            />
            <path
              className="cls-2"
              d="M174.19,224.99c-7.52,10.65-9.53,25.22-2.19,42.21-2.08,.39-4.09,.65-6,.82-4.08-19.26-1.35-33.6,8.19-43.04h0Zm-18.08,112.28c-14.58-3.07-12.77-12.37-18.16-21.79,3.49,.89,7.32,1.58,11.49,2.07,.84,6.67,3.06,13.24,6.67,19.72h0ZM66.48,80.88c-8.03,10.85-11.7,22.53-12.08,33.55-.37,11.01,2.52,21.37,7.6,29.63,.47,.76,.96,1.5,1.46,2.22,13.46,15.92,32.95,19.17,58.48,9.76,14.7-6.32,26.09-9.57,34.18-9.75,8.09,.18,19.48,3.43,34.18,9.75,25.53,9.41,45.02,6.16,58.48-9.76,.5-.72,.99-1.46,1.46-2.22,5.08-8.25,7.97-18.62,7.6-29.63-.38-11.03-4.04-22.7-12.08-33.55-13.3-17.97-32.65-27.22-53.26-34.26,2.83-2.04,5.09-2.79,6.77-2.26,24,8.46,40.07,20.59,49.96,33.94,8.59,11.61,12.52,24.14,12.92,35.99,.4,11.88-2.73,23.08-8.24,32.03-5.13,8.34-12.34,14.73-20.7,17.92-19.92,7.6-35.3,1.74-50.23-3.95-8.89-3.39-17.62-6.71-26.86-6.84-9.24,.13-17.97,3.45-26.86,6.84-14.93,5.68-30.32,11.54-50.23,3.95-8.35-3.18-15.56-9.58-20.7-17.92-5.51-8.95-8.65-20.15-8.24-32.03,.4-11.86,4.33-24.39,12.92-35.99,9.88-13.35,25.95-25.48,49.96-33.94,1.68-.53,3.94,.22,6.77,2.26-20.6,7.04-39.95,16.29-53.26,34.26h0Zm89.64,87.55c-24.96-2.85-44.18,14.12-73.52,4.13h-.02c-4.04-1.2-7.99-3.06-11.8-5.8C17.36,128.46,53.66,37.9,117.9,37.46c-5.3-5.74-7.95-8.61-7.95-8.61-7.48,2.76-13.17,6.28-17.08,10.57-.48-5.6,.02-11.24,1.51-16.91-34.43,15.02-53.2,40.78-56.3,77.3-6.22,73.16,52.22,103.39,118.03,106.23,11.14-.48,22.06-1.75,32.5-3.87-24.78,.41-32.5-10.04-32.5-33.74h0ZM21.93,68.88c6.09-.61,13.95-.56,16.94-.54-8.28,16.59-11.42,40.74-7.66,64.98-10.66-7.64-16.99-13.7-18.97-18.16-5.44-33.83,1.78-68.97,21.68-105.43,2.37,.33,3.75,.61,4.13,.81-12.3,22.77-15.73,40.66-10.27,53.67-2.39,1.4-4.34,2.96-5.85,4.67h0ZM278.31,9.72c-2.37,.33-3.75,.61-4.13,.81,9.11,21.48,11.35,38.76,6.71,51.83,4.08,1.84,7.21,4.01,9.42,6.51,2.88-13.81-1.12-33.52-11.99-59.15h0Zm4.28,104.13c-.04,6.38-.56,12.92-1.57,19.46,10.66-7.64,16.99-13.7,18.97-18.16,.79-4.91,1.31-9.84,1.57-14.8-5.19,6.9-11.52,11.4-18.97,13.5h0Zm-54.22,130.59c.03,2.7-.07,5.54-.29,8.53,12.74,2.8,19.11,4.2,19.11,4.2,.32,2.35-.22,4.7-1.63,7.05-16.48-2.06-30.05-2.64-40,.71-26.69,8.99-34.72-12.64-26.56-30.76,1.27,38.08,27.05,10.14,49.37,10.27h0Zm24.5,6.63c1.33,4.9,1.28,9.11-.13,12.6,10.96-1.96,17.87-8.68,20.86-17.92-7.27,7.91-25.68-3.36-37.37-2.56,0,.9,0,1.81-.03,2.74,8.15,1.85,13.7,3.57,16.67,5.15h0Zm-96.76,17.35v-17.58s1.14-10.39,3.41-31.17c8.92-2.74,15.78-5.95,22.31-10.07-8.02,1.24-16.6,2.1-25.72,2.57-35.44-1.86-62.59-9.45-81.48-22.77-1.17,14.45-1.76,21.68-1.76,21.68,40.53-17.01,86.83,11.04,67.35,56.1,6.12,1.16,11.59,1.12,15.89,1.22h0Zm-96.76-17.35c-1.33,4.9-1.28,9.11,.13,12.6-31.33-5.61-29.55-50.03,2.1-81.24,1.7,1.51,3.71,3.22,6.03,5.15-1.79,8.77-2.51,17.42-2.17,25.95-4.72,3.38-8.37,7.3-10.93,11.77-1.95,3.16-3.28,6.91-3.99,11.25-.27,1.58-.44,3.22-.52,4.9,4.09-9.27,13.59-14.36,28.51-15.27h0c-1.87,5.52-2.7,12.09-2.49,19.74-8.15,1.85-13.7,3.57-16.67,5.15h0Zm27.33-24.97c-2.5,7.09-3.34,16.04-2.53,26.87-12.74,2.8-19.11,4.2-19.11,4.2-.32,2.35,.22,4.7,1.63,7.05,16.48-2.06,30.05-2.64,40,.71,14.09,4.74,22.97,.95,27.03-6.34-20.02,4.54-7.83-29.13-47.02-32.48h0Zm69.43,84.87c-38.64-3.01-38.23-10.51-59.36-38.35,12.51-1.28,13.78,11.96,38.76,.68,1.1,11.06,3.39,20.28,6.88,27.67,1.29,1.92,8.23,7.08,13.71,10.01h0Z"
            />
            <path
              className="cls-3"
              d="M252.87,251.07c1.33,4.9,1.28,9.1-.13,12.6,31.33-5.61,29.55-50.03-2.1-81.24-1.7,1.51-3.71,3.22-6.03,5.15,1.79,8.77,2.51,17.42,2.17,25.95,9.76,6.98,14.91,16.29,15.45,27.92-3.91-15.06-16.02-24.32-36.32-27.78,7.27,6.83,10.7,17.58,10.3,32.25,8.15,1.85,13.7,3.57,16.67,5.15h0Z"
            />
          </g>
        </g>
      </StyledLogo>
      <h2 className="font-semibold tracking-wider  text-primary-300 dark:text-white">
        Meetmax
      </h2>
    </div>
  );
};

export default Logo;
