import React from 'react';

interface NumberInputProps {
  label: string;
  min: number;
  max: number;
  value?: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, min, max, value, onChange }) => (
  <div>
    <label>{label}</label>
    <input
      type="number"
      min={min}
      max={max}
      value={value || ''}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full p-2 border rounded"
    />
  </div>
);

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className="w-4 h-4"
  />
);

interface IndicatorConfig {
  kdj?: {
    n_period: number;
    k_period: number;
    d_period: number;
  };
  obv?: {
    enabled: boolean;
  };
  macd?: {
    fast_period: number;
    slow_period: number;
    signal_period: number;
  };
}

interface IndicatorEditorProps {
  config: IndicatorConfig;
  updateConfig: (indicator: string, values: Record<string, any>) => void;
  selectedIndicator: string;
}

const IndicatorEditor: React.FC<IndicatorEditorProps> = ({ config, updateConfig, selectedIndicator }) => {
  const renderKDJConfig = () => (
    <div className="space-y-4">
      <NumberInput
        label="周期N (9)"
        min={5}
        max={50}
        value={config.kdj?.n_period}
        onChange={v => updateConfig('kdj', { n_period: v })}
      />
      <NumberInput
        label="K周期 (3)"
        min={1}
        max={10}
        value={config.kdj?.k_period}
        onChange={v => updateConfig('kdj', { k_period: v })}
      />
      <NumberInput
        label="D周期 (3)"
        min={1}
        max={10}
        value={config.kdj?.d_period}
        onChange={v => updateConfig('kdj', { d_period: v })}
      />
    </div>
  );

  const renderOBVConfig = () => (
    <div className="flex items-center space-x-2">
      <Switch
        checked={config.obv?.enabled ?? true}
        onChange={checked => updateConfig('obv', { enabled: checked })}
      />
      <span>启用能量潮指标</span>
    </div>
  );

  const renderMACDConfig = () => (
    <div className="space-y-4">
      <NumberInput
        label="快线周期 (12)"
        min={2}
        max={50}
        value={config.macd?.fast_period}
        onChange={v => updateConfig('macd', { fast_period: v })}
      />
      <NumberInput
        label="慢线周期 (26)"
        min={3}
        max={100}
        value={config.macd?.slow_period}
        onChange={v => updateConfig('macd', { slow_period: v })}
      />
      <NumberInput
        label="信号线周期 (9)"
        min={1}
        max={30}
        value={config.macd?.signal_period}
        onChange={v => updateConfig('macd', { signal_period: v })}
      />
    </div>
  );

  const renderContent = () => {
    switch(selectedIndicator) {
      case 'kdj': return renderKDJConfig();
      case 'obv': return renderOBVConfig();
      case 'macd': return renderMACDConfig();
      default: return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default IndicatorEditor;