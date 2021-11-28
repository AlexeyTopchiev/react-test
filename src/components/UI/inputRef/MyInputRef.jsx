import React from "react"
import classes from "./MyInputRef.module.css"

const MyInputRef = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} className={classes.myInputRef} />
})

export default MyInputRef
