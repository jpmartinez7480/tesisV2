hampelFilter<-function(signal,window,threshold){
  library(jsonlite)
  library(pracma)

  signal <- fromJSON(signal, simplifyVector = TRUE)
  final <- list()
  i <- 1
  while( i < 5){
    result <- hampel(signal[i,], k=window,t0 = threshold)
    final[i] <- result
    i <- i + 1
  }
  return (final)
}
