MedianFilter <- function(signal,order){
  library(jsonlite)
  library(fractal)
  #signal <- '[[31,30,29,27,29,19],[38,37,40,31,30,30],[57.81,57.546,57.81,57.546,57.072,57.072],[7.6,8.2,8.2,8.2,8.2,8.2]]'
  signal <- fromJSON(signal,simplifyVector = TRUE)
  final <- list()
  i <- 1
  while(i < 5){
    final[i] <- list(fractal::medianFilter(signal[i,],order))
    i <- i + 1
  }
  return(final)
}
