export const getComponentWidth = (componentRef: React.RefObject<HTMLUListElement | HTMLLIElement>): number => {
    if (componentRef.current) {
        const containerWidth = componentRef.current.getBoundingClientRect().width;
        return containerWidth;
      }
}