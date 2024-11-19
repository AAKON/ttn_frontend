import { Container } from '@/shared';

export function Section({noDefaultStyle=false, container=true, className , children, ...props}) {
    return (
        <section className={` ${noDefaultStyle ? className : ("py-8 md:py-[80px]" + " " + className)} `} {...props}>
            {container && <Container>{children}</Container>}
            {!container && children}
        </section>
    );
}
