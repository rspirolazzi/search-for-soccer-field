export const dummyName=(name, {width=60, height=60})=>{
    //let {images} = this.props.stadium;
    const logo = name.split(' ').map(n=>{
        if(n.length>0){
            return n[0].toString().toUpperCase()
        }
    }).join('')
    return `//dummyimage.com/${width}x${height}/8f8f8f/ffffff.png&text=${logo}`
}