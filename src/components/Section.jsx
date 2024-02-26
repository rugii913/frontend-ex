export default function Section({ title, children, ...props }) { // 여기서 ...은 JS의 rest property
    return <section {...props}> {/* 여기서 ...은 JS의 스프레드 연산자 - 위 title, children까지 모두 모아서 펼침 - wrapper component 작성 시 유용함 */}
        <h2>{title}</h2>
        {children}
    </section>
}
