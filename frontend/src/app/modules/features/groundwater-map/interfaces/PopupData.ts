export interface WellPopupData {
    PointID: String,
    Agency: String,
    NumObservations: String,
    LastObservationValue: Number,
    LastObservationDate: String,
    Trend: string
}

export interface SuggestedMonitoringPopupData {
  Region: string,
  Aquifer: string,
  Function: string,
  Depth: string,
  Artesian: string
}
