useForm 함수를 이용하여 input의 입력값과 이벤트를 추적할 수 있다.

```
const {register , watch, handleSubmit,formState} = useForm()
console.log(watch()) // watch를 통해 상태 추적
handleSubmit => onSubmit의 역할
const onValid = (data)=>{
    console.log(data)
}
<form onSubmit={handleSubmit(데이터가 유효할 시 실행할 함수(필수값) onValid ,데이터가 무효할 시 실행할 함수(필수값x))}>
    <input {...register("작명 / 여기서 작명한 값이 key가 됨", {required(필수여부):true, pattern(정규식):~~, minLength:{value:5 , message:"짧습니다"}})}></input> // require 속성이 들어가 있으면 값을 넣지 않았을 때 자동으로 포커싱해줌 // minLength 속성으로 최소 글자 체크
</form>

```
