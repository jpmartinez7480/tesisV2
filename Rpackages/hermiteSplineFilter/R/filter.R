getQuantileHigh <- function(signal,order){
  high_data<-(-quantile(-signal, order/100,na.rm = TRUE))
  return (ifelse(is.na(high_data),numeric(0), high_data))
}

getQuantileLow <- function(signal,order){
  low_data<-(quantile(signal, order/100,na.rm = TRUE))
  return (ifelse(is.na(low_data),numeric(0), low_data))
}

getOutliers <- function(signal,vh, vl){
  posOutliers<-sort(union(which(signal<=vl),which(signal>=vh)))
  cantidadOutliers<-length(posOutliers)
  #Si el valor del ultimo elemento coincide con la cantidad de samples, se quita pues es motivo de error
  #if (posOutliers[cantidadOutliers]==length(signal)){
  #  length(posOutliers) <- length(posOutliers)-1
  #}
  if (length(posOutliers)==0){
    return (signal)
  }
  else
    return(posOutliers)
}

getSpline <- function(signal,posOutliers){
  library(zoo)
  splineSignal <- NULL
  listaSNA <- vector()
  tryCatch(
    expr = {
      splineSignal<-pracma::interp1(signal[-posOutliers],
                                   signal[-posOutliers],
                                   signal,method = "spline")
      return (splineSignal)
    },
    error=function(e) {
      listaSNA<-signal
      listaSNA[posOutliers]<-NA
      #listaSNA<-zoo::zoo(listaSNA,signal)
      listaSNA<-zoo::na.approx(listaSNA, rule = 2)
      return (listaSNA)
    }
  )
}

getHermiteSplineInterpolation <- function(signal, order){
  library(jsonlite)
  cnt <- 0
  can_do_spline <- FALSE
  can_get_outliers <- FALSE
  can_get_quantile_low <- FALSE
  can_get_quantile_high <- TRUE
  #result <- fromJSON(signal, simplifyVector = TRUE)
  #signal <- as.data.frame(result)
  signal <- fromJSON(signal, simplifyVector = TRUE)
  signal_filtered <- c()
  final <- list()
  res_ql <- 0
  res_qh <- 0
  aux_qh <- 0
  res_outliers <- 0
  j <- 1
  i <- 1
  while(cnt < 8){
    if(can_do_spline){
      signal_filtered <- NULL
      if(typeof(res_outliers) == 'integer'){
        result <- c(getSpline(signal[i-3,], res_outliers))
        final[j] <- list(result)
        j <- j + 1
      }
      else{
        final[j] <- res_outliers
        j <- j + 1
      }
    }
    if(can_get_outliers){
      res_outliers <- getOutliers(signal[i-2,], aux_qh, res_ql)
      can_do_spline <- TRUE
    }
    if(can_get_quantile_low){
      res_ql <- getQuantileLow(signal[i-1,],order)
      aux_qh <- res_qh
      can_get_outliers <- TRUE
    }
    if(can_get_quantile_high){
      res_qh <- getQuantileHigh(signal[i,],order)
      can_get_quantile_low <- TRUE
    }
    if( i < 7){
      i <- i + 1
    }
    if(i == 5){
      can_get_quantile_high <- FALSE
    }
    if(i == 6){
      can_get_quantile_low <- FALSE
    }
    if(i == 7){
      can_get_outliers <- FALSE
    }
    cnt <- cnt + 1
  }
  return (final)
}


SplineFilter <- function(signal){
  library(jsonlite)
  final <- list()
  cnt <- 0
  signal <- fromJSON(signal, simplifyVector = TRUE)
  while(cnt < 4){
    qh <- getQuantileHigh(signal[cnt,])
    ql <- getQuantileLow(signal[cnt,])
    outlier <- getOutliers(signal[cnt,],qh,ql)
    result <- list(getSpline(signal[cnt,],outlier))
    final[cnt] <- result
    cnt <- cnt + 1
  }
  return(final)
}


