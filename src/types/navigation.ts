export type Item = {
    label: string,
    value: string
}

export type TopNavProps = {
    items: Item[],
    active: string
}