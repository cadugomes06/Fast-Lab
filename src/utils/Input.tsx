interface InputProps {
    type: string;
    name?: string;
    id: string;
    placeholder: string;
    width?: string;
    height?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    multiple?: boolean
    maxLenght?: number
    disabled?: boolean
  }

const Input: React.FC<InputProps> = ({type, name, id, placeholder, width, height, onChange, value, multiple, maxLenght, disabled}) => {
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
       onChange={onChange}
       disabled={disabled}
       value={value}
       multiple={multiple}
       maxLength={maxLenght}
       className="border-gray-500 outline-none rounded-lg pl-2 shadow-md shadow-gray-300 cursor-pointer focus:outline-teal-200 focus:shadow-teal-200 text-teal-800 mb-4 @supports disabled:opacity-25"
        />
  )
}

export default Input