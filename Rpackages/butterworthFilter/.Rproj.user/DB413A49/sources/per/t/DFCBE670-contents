butterworthFilter <- function(signal, order, frecuency){
  library(jsonlite)
  library(signal)
  #signal <- '[[31,30,29,27,29,19],[38,37,40,31,30,30],[57.81,57.546,57.81,57.546,57.072,57.072],[7.6,8.2,8.2,8.2,8.2,8.2]]'
  signal <- fromJSON(signal, simplifyVector = TRUE)
  final <- list()
  i <- 1
  butter_coef <- signal::butter(order,frecuency,type='low')
  while(i < 5){
    #print(signal[i,])
    filter_result <- filter(butter_coef, signal[i,])
    final[i] <- list(round(filter_result, 6))
    i <- i + 1
  }
  return(final)
}

