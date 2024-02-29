export default function Tabs({ children, buttons, ButtonsContainer ="menu" }) {
    // const ButtonsContainer = buttonsContainer; // 이 변수명은 대문자로 시작해야 함

    return <>
        <ButtonsContainer>
            {buttons}
        </ButtonsContainer>
        {children}
    </>
}
