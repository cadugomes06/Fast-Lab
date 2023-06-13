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
       className="border-gray-500 outline-none rounded-lg pl-2 shadow-md shadow-gray-200 cursor-pointer focus:outline-teal-200 focus:shadow-teal-200 text-teal-800 mb-4"
        />
  )
}

export default Input