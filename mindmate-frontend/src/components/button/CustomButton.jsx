import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
  position: relative;
  disabled: ${(props) => props.disabled};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  font-size: ${(props) => props.fontSize}px;
  border-radius: ${(props) => props.borderRadius}px;
  display: ${(props) => props.display};
  width: ${(props) => props.width}px;
  padding: ${(props) =>
          props.size === "sm"
                  ? "1.5rem"
                  : props.size === "md"
                          ? "1.8rem"
                          : props.size === "lg"
                                  ? "2.0rem"
                                  : "1.5rem"};
  height: ${(props) =>
          props.size === "sm"
                  ? "34px"
                  : props.size === "md"
                          ? "37px"
                          : props.size === "lg"
                                  ? "40px"
                                  : "30px"};

  font-family: "Inner", "Lato";
  font-weight: 500;
  border: 1px solid transparent;
  background-color: ${(props) =>
          props.variant === "light"
                  ? "#f8f9fa"
                  : props.variant === "dark"
                          ? "#212529"
                          : props.variant === "primary"
                                  ? "#1e5d88"
                                  : props.variant === "cancel"
                                          ? "#758188"
                                          : props.variant === "update"
                                                  ? "#6f66df"
                                                  : props.variant === "edit"
                                                          ? "#006de4"
                                                          : props.variant === "warning"
                                                                  ? "#ffc107" :
                                                                  props.variant === "active"
                                                                          ? "rgba(255,255,255,0)"
                                                                          : props.variant === "danger"
                                                                                  ? "#dc3545"
                                                                                  : "#f8f9fa"};
  color: ${(props) =>
          props.variant === "light"
                  ? "#000000"
                  : props.variant === "dark"
                          ? "#ffffff"
                          : props.variant === "primary"
                                  ? "#ffffff"
                                  : props.variant === "cancel"
                                          ? "#ffffff"
                                          : props.variant === "success"
                                                  ? "#ffffff"
                                                  : props.variant === "info"
                                                          ? "#ffffff"
                                                          : props.variant === "warning"
                                                                  ? "#ffffff"
                                                                  : props.variant === "active"
                                                                          ? "#000000"
                                                                          : props.variant === "history"
                                                                                  ? "#000000"
                                                                                  : props.variant === "danger"
                                                                                          ? "#ffffff"
                                                                                          : "#ffffff"};

  &:hover,
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    color: #ffffff;
    background-color: ${(props) =>
            props.variant === "active"
                    ? "#1e5d88"
                    : props.variant === "history"
                            ? "#E5B0B0"
                            : "#1e5d88"
    };
  }

  &:active {
    background-color: ${(props) =>
            props.variant === "active"
                    ? "#1e5d88"
                    : props.variant === "history"
                            ? "#E5B0B0"
                            : "#1e5d88"
    };
`;
const CustomButton = ({
                          type,
                          variant,
                          className,
                          id,
                          onclick,
                          children,
                          width,
                          radius,
                          size,
                          fontSize,
                          height,
                          display,
                          disabled
                      }) => {
    return (
        <ButtonComponent
            type={type ? type : "button, file"}
            variant={variant}
            className={
                className ? `button-components ${className}` : "btn-components"
            }
            id={id}
            onClick={onclick}
            width={width}
            borderRadius={radius}
            size={size}
            fontSize={fontSize}
            height={height}
            display={display}
            disabled={disabled}
        >
            {children}
        </ButtonComponent>
    );
};


export default CustomButton;
