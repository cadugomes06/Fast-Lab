interface ButtonProps {
    text: string;
    width?: string;
    height?: string;
    onClick?: () => void;
    marginTop?: string;
    marginBottom?: string;
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
         className="bg-teal-600 rounded-lg text-white font-semibold uppercase
         text-sm cursor-pointer hover:bg-teal-700 ease-in duration-150 shadow-lg shadow-gray-300"
         onClick={() => console.log('click no btn')}>
        {text}
         
    </button>
)
}


export default Button