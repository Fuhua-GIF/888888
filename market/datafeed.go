type Kline struct {
	Timestamp int64   `json:"timestamp"`
	Open      float64 `json:"open"`
	High      float64 `json:"high"`
	Low       float64 `json:"low"`
	Close     float64 `json:"close"`
	Volume    float64 `json:"volume"`
	// ... existing fields ...
}

// GetOHLCV 获取完整K线数据（含高低收量）
func (d *DataFeed) GetOHLCV(symbol string, timeframe string, limit int) ([]Kline, error) {
	// ... existing implementation ...
	return klines, nil
}