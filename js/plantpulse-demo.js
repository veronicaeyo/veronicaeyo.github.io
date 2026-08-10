(function () {
  const output = document.getElementById("plantpulse-output");
  const demo = document.getElementById("plantpulse-demo");

  if (!output || !demo) {
    return;
  }

  const scenarios = {
    hi: `> Hi

Welcome to PlantPulse.

I help you review synthetic oil and gas instrumentation data. You can ask about asset health, loop diagnosis, alarms, calibration, maintenance priorities, production forecasts, manufacturer failure patterns, and dashboard KPIs.

Available instruments:
- PT-204: Pressure Transmitter, Gas Compression
- CV-112: Control Valve, Crude Stabilization
- FT-330: Flow Transmitter, Produced Water
- LT-401: Level Transmitter, Separator Train
- GD-018: Gas Detector, Metering Skid
- VS-220: Vibration Sensor, Export Pump`,
    diagnose: {
      prompt: "Diagnose CV-112",
      reply: `CV-112 is a control valve in Crude Stabilization.

Risk: High

Key findings:
- Alarm frequency is elevated for the last 7 days.
- Drift is above preferred tolerance for reliable control.
- Calibration is overdue.

Recommended next steps:
1. Review recent process disturbances and alarm history.
2. Check valve response and positioner feedback.
3. Complete calibration before using this loop for optimization decisions.`
    },
    risk: {
      prompt: "Show asset risk",
      reply: `Here are the highest-risk synthetic instruments:

1. CV-112 | Control Valve | Crude Stabilization
   Risk: High
   Reason: overdue calibration, frequent alarms, loop instability indicators

2. LT-401 | Level Transmitter | Separator Train
   Risk: High
   Reason: out-of-range reading, elevated alarms, calibration due soon

3. VS-220 | Vibration Sensor | Export Pump
   Risk: Medium-High
   Reason: vibration reading above normal band and rising trend

Suggested workflow:
- Prioritize CV-112 and LT-401 for immediate maintenance review.
- Add VS-220 to the reliability watchlist.`
    },
    exports: {
      prompt: "Preview exports",
      reply: `PlantPulse generated browser previews and downloadable files.

HTML preview:
- Asset health dashboard
- Alarm summary by location
- Calibration risk table
- Maintenance priority list

PDF preview:
- Executive summary
- Top instrument risks
- Recommended actions

Excel preview:
- asset_health.xlsx
- alarms_by_area.xlsx
- calibration_due.xlsx
- production_forecast.xlsx

SQLite chat history:
- User prompt
- Selected instrument/location filters
- Assistant response
- Export request metadata`
    },
  };

  function renderScenario(key) {
    const scenario = scenarios[key];
    if (!scenario) {
      return;
    }
    output.textContent = typeof scenario === "string" ? scenario : `> ${scenario.prompt}\n\n${scenario.reply}`;
  }

  demo.querySelectorAll("[data-demo]").forEach((button) => {
    button.addEventListener("click", () => renderScenario(button.dataset.demo));
  });

  renderScenario("hi");
})();
