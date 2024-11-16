// Fetch all countries data
async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    return await response.json();
}

// Sanitize names for use in CSS classes
function sanitizeClassName(name) {
    return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
}

// Process the fetched data and group countries by subregion
function processData(countries) {
    const subregions = {};

    countries.forEach(country => {
        const subregion = country.subregion || 'Unknown';
        if (!subregions[subregion]) {
            subregions[subregion] = {
                name: subregion,
                population: 0,
                area: 0,
                countries: [],
            };
        }
        subregions[subregion].population += country.population || 0;
        subregions[subregion].area += country.area || 0;
        subregions[subregion].countries.push({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : 'Unknown',
            population: country.population || 0,
            area: country.area || 0,
        });
    });

    // Sort subregions alphabetically
    return Object.values(subregions).sort((a, b) => a.name.localeCompare(b.name));
}

// Group subregions into groups of 5 for pagination
function groupSubregions(subregions) {
    const groups = [];
    for (let i = 0; i < subregions.length; i += 5) {
        groups.push(subregions.slice(i, i + 5));
    }
    return groups;
}

// Render the table with subregion and country data
function renderTable(data) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    data.forEach(subregion => {
        const sanitizedSubregionName = sanitizeClassName(subregion.name);

        // Subregion row
        const subregionRow = document.createElement('tr');
        subregionRow.className = 'subregion-row';
        subregionRow.innerHTML = `
            <td onclick="toggleSubregion('${sanitizedSubregionName}')">
                ${subregion.name}
            </td>
            <td></td>
            <td>${subregion.population.toLocaleString()}</td>
            <td>${subregion.area.toLocaleString()} km²</td>
        `;
        tbody.appendChild(subregionRow);

        // Country rows
        const sortedCountries = subregion.countries.sort((a, b) => a.name.localeCompare(b.name));
        sortedCountries.forEach(country => {
            const countryRow = document.createElement('tr');
            countryRow.className = `country-row ${sanitizedSubregionName}`;
            countryRow.innerHTML = `
                <td>${country.name}</td>
                <td>${country.capital}</td>
                <td>${country.population.toLocaleString()}</td>
                <td>${country.area.toLocaleString()} km²</td>
            `;
            tbody.appendChild(countryRow);
        });
    });
}

// Toggle visibility of countries when a subregion row is clicked
function toggleSubregion(subregionName) {
    const rows = document.querySelectorAll(`.country-row.${subregionName}`);
    const isHidden = Array.from(rows).some(row => !row.classList.contains('visible'));

    rows.forEach(row => {
        if (isHidden) {
            row.classList.add('visible');
        } else {
            row.classList.remove('visible');
        }
    });
}

// Show a specific group of subregions
function showGroup(index) {
    const groups = groupSubregions(processedData);
    const selectedGroup = groups[index];
    renderTable(selectedGroup);

    // Update indicator colors
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Load the data and initialize the application
let processedData = [];

document.addEventListener('DOMContentLoaded', async () => {
    const countries = await fetchCountries();
    processedData = processData(countries);

    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showGroup(index));
    });

    // Show the first group by default
    showGroup(0);
});
