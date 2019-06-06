escribeInfo<-function(listObject,stringNombreArchivoSalida,boolColNames=FALSE,boolAppend=FALSE,stringSeparador="\t"){
  data_frame <- data.frame(
    VFSCI = c(listObject[2,]),
    VFSCD = c(listObject[1,]),
    PSA = c(listObject[3,]),
    CO2 = c(listObject[4,]),
    stringsAsFactors = FALSE

  )
  write.table(data_frame, file = stringNombreArchivoSalida, append = boolAppend, quote = FALSE, sep = stringSeparador,
              eol = "\n", na = "NA", dec = ".", row.names = FALSE,
              col.names = boolColNames,
              fileEncoding = "")
}


exportSignal<-function(signals){
  library(jsonlite)
  signal <- fromJSON(signals, simplifyVector = TRUE)
  escribeInfo(signal,"test.fil")
  return(TRUE)
}
