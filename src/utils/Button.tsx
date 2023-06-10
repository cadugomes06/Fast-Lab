interface ButtonProps {
    text: string;
    width?: string;
    height?: string;
}

const Button: React.FC<ButtonProps> = ({text, width, height}) => {
    const buttonStyle: React.CSSProperties = {
        width,
        height,
    };

return (
    <button
         style={buttonStyle}
         className="bg-teal-600 rounded-lg text-white font-semibold uppercase
         text-sm cursor-pointer hover:bg-teal-700 ease-in duration-150 shadow-lg shadow-gray-300">
        {text}
    </button>
)
}


export default Button