// Datos de ejemplo (reemplazar con datos reales)
const ps4GamesSales = [
  { "Game": "Game 1", "Year": 2017, "Sales": 8000000 },
  { "Game": "Game 2", "Year": 2016, "Sales": 7500000 },
  { "Game": "Game 3", "Year": 2015, "Sales": 7000000 },
  // ... Añadir más datos según lo que se desee mostrar
];

// Tamaño del gráfico
const width = 800;
const height = 500;
const padding = 60;

// Crear el elemento SVG
const svg = d3.select("#chart")
  .attr("width", width)
  .attr("height", height);

// Escalas para los ejes
const xScale = d3.scaleLinear()
  .domain([d3.min(ps4GamesSales, d => d.Year - 1), d3.max(ps4GamesSales, d => d.Year + 1)])
  .range([padding, width - padding]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(ps4GamesSales, d => d.Sales)])
  .range([height - padding, padding]);

// Crear puntos en el gráfico
svg.selectAll("circle")
  .data(ps4GamesSales)
  .enter()
  .append("circle")
  .attr("class", "dot")
  .attr("cx", d => xScale(d.Year))
  .attr("cy", d => yScale(d.Sales))
  .attr("r", 6)
  .attr("data-xvalue", d => d.Year)
  .attr("data-yvalue", d => d.Sales)
  .on("mouseover", (event, d) => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "block";
    tooltip.style.left = event.pageX + "px";
    tooltip.style.top = event.pageY - 50 + "px";
    tooltip.innerHTML = `Game: ${d.Game}<br>Year: ${d.Year}<br>Sales: ${d.Sales}`;
    tooltip.setAttribute("data-year", d.Year);
  })
  .on("mouseout", () => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  });

// Agregar ejes
const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
const yAxis = d3.axisLeft(yScale).tickFormat(d => {
  const minutes = Math.floor(d / 60000);
  const seconds = (d % 60000) / 1000;
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
});

svg.append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(0, ${height - padding})`)
  .call(xAxis);

svg.append("g")
  .attr("id", "y-axis")
  .attr("transform", `translate(${padding}, 0)`)
  .call(yAxis);
