(function () {
  const output = document.getElementById("plantpulse-output");
  const demo = document.getElementById("plantpulse-demo");

  if (!output || !demo) {
    return;
  }

  const scenarios = {
    critical: {
      prompt: "run_governed_query(query_name='critical_assets')",
      response: {
        rows: [
          { tag: "CV-112", asset: "Control Valve", area: "Crude Stabilization", risk: 97, signal: "HART", finding: "Overdue calibration and frequent loop alarms" },
          { tag: "LT-401", asset: "Level Transmitter", area: "Separator Train", risk: 92, signal: "4-20mA", finding: "Out-of-range level reading with rising drift" },
          { tag: "VS-220", asset: "Vibration Sensor", area: "Export Pump", risk: 79, signal: "WirelessHART", finding: "Pump vibration reading above normal band" }
        ]
      }
    },
    diagnose: {
      prompt: "diagnose_loop(tag='CV-112')",
      response: {
        tag: "CV-112",
        service: "Stabilizer pressure control",
        risk_band: "high",
        findings: [
          "Frequent alarms indicate unstable loop behavior or noisy measurement.",
          "Measured drift is above preferred tolerance for reliable control.",
          "Calibration is overdue."
        ],
        recommended_actions: [
          "Review alarm rationalization, controller tuning, and recent process disturbances.",
          "Schedule calibration check and compare valve positioner feedback against field observation.",
          "Validate transmitter output against a reference standard before optimization decisions."
        ]
      }
    },
    maintenance: {
      prompt: "recommend_maintenance(risk_threshold=60)",
      response: {
        recommendations: [
          { priority: "P1", tag: "CV-112", area: "Crude Stabilization", action: "Tune loop and complete overdue calibration." },
          { priority: "P1", tag: "LT-401", area: "Separator Train", action: "Inspect level transmitter, impulse lines, and separator operating condition." },
          { priority: "P2", tag: "VS-220", area: "Export Pump", action: "Inspect bearing vibration trend and schedule pump reliability review." }
        ]
      }
    },
    report: {
      prompt: "generate_report(area='Crude Stabilization')",
      response: {
        report: [
          "PlantPulse MCP I&C Analytics Report",
          "Scope: Crude Stabilization",
          "Assets reviewed: 1",
          "Top risk: CV-112, Stabilizer pressure control, risk 97/high",
          "Recommended action: tune loop, inspect valve response, and complete overdue calibration"
        ]
      }
    }
  };

  function renderScenario(key) {
    const scenario = scenarios[key];
    if (!scenario) {
      return;
    }
    output.textContent = `> ${scenario.prompt}\n\n${JSON.stringify(scenario.response, null, 2)}`;
  }

  demo.querySelectorAll("[data-demo]").forEach((button) => {
    button.addEventListener("click", () => renderScenario(button.dataset.demo));
  });

  renderScenario("critical");
})();
