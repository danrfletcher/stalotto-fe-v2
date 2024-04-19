// src/custom-elements.d.ts
declare namespace JSX {
    interface IntrinsicElements {
        'boodil-widget': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        >;
    }
}
