export const formatLabel = (key) => {
    let str = key.replace(/([A-Z])/g, ' $1').trim()
    str = str.replace(/\b\w/g, l => l.toUpperCase())
    return str
}