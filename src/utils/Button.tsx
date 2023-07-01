interface ButtonProps {
    text: string;
    width?: string;
    height?: string;
    marginTop?: string;
    marginBottom?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => void;
    disabled?: any;
    background?: string | number;
    borderColor?: any;
    color?: any
    type?: any
    boxShadow?: any
}

const Button: React.FC<ButtonProps> = ({text, width, height, onClick, marginTop, marginBottom, disabled, background, borderColor, color, boxShadow}) => {
    const buttonStyle: React.CSSProperties = {
        width,
        height,
        marginTop,
        marginBottom,
        background,
        borderColor,
        color,
        boxShadow,
    };

return (
    <button
         type="submit"
         style={buttonStyle}
         onClick={onClick}
         disabled={disabled}
         className="bg-teal-600 rounded-lg text-white font-semibold uppercase text-sm cursor-pointer hover:bg-teal-700 ease-in duration-150 shadow-lg shadow-gray-300 hover:border-double hover:border-4 hover:border-white border"
         >
        {text}
         
    </button>
)
}


export default Button