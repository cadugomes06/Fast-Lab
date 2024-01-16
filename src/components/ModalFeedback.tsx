
const ModalFeedback = () => {

  return (

    <div className="w-full h-[100vh] bg-black/30 fixed z-10 flex justify-center items-center">
        <div className="w-[22rem] h-[14rem] bg-white rounded-md shadow-md flex flex-col items-center justify-center gap-14">
            <h1>title</h1>
            <p>message</p>
        </div>
    </div>
  )
}

export default ModalFeedback