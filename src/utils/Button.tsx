interface ButtonProps {
    text: string;
    width?: string;
    height?: string;
    marginTop?: string;
    marginBottom?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({text, width, height, onClick, marginTop, marginBottom}) => {
    const buttonStyle: React.CSSProperties = {
        width,
        height,
        marginTop,
        marginBottom,
    };

return (
    <button
         style={buttonStyle}
         onClick={onClick}
         className="bg-teal-600 rounded-lg text-white font-semibold uppercase
         text-sm cursor-pointer hover:bg-teal-700 ease-in duration-150 shadow-lg shadow-gray-300"
         >
        {text}
         
    </button>
)
}


export default Button