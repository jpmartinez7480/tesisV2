automaticFilter<-function(listaSenal,order_hermite,window_hampel,thresold_hermite,order_butter,cut_butter){
  library('hermiteSplineFilter')
  library('HampelFilter')
  library('butterworthFilter')
  library("jsonlite")

  result_hermite <- hermiteSplineFilter::getHermiteSplineInterpolation(listaSenal,order_hermite)
  result_hermite <-toJSON(result_hermite)
  result_hampel <- HampelFilter::hampelFilter(result_hermite,window_hampel,thresold_hermite)
  result_hampel <- toJSON(result_hampel)
  result <- butterworthFilter::butterworthFilter(result_hampel,order_butter,cut_butter)
  return(result)
}
