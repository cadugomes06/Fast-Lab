interface InputProps {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    width?: string;
    height?: string;
  }

const Input: React.FC<InputProps> = ({type, name, id, placeholder, width, height}) => {
    const inputStyle: React.CSSProperties = {
        width,
        height,
    };

  return (
    <input 
       type={type}
       name={name}
       id={id}
       placeholder={placeholder}
       style={inputStyle}
       className="border-black hover:border-teal-600 bg-white rounded-lg pl-2 drop-shadow-md shadow-gray-200 cursor-pointer outline-none focus:border-teal-600"
        />
  )
}

export default Input