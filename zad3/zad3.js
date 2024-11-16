// Funkcje

// a) Wyświetlenie miast z województwa małopolskiego
function displayMalopolskieCities(cities) {
    const malopolskieCities = cities.filter(city => city.province === "małopolskie");
    malopolskieCities.forEach(city => {
        document.getElementById("malopolskie").innerHTML += `<p>${city.name}</p>`;
    });
}

// b) Wyświetlenie miast, które w nazwie zawierają dwa znaki ‘a’
function displayCitiesWithTwoA(cities) {
    const citiesWithTwoA = cities.filter(city => (city.name.match(/a/g) || []).length === 2);
    citiesWithTwoA.forEach(city => {
        document.getElementById("twoA").innerHTML += `<p>${city.name}</p>`;
    });
}

// c) Wyświetlenie piątego pod kątem gęstości zaludnienia miasta
function displayFifthCityByDensity(cities) {
    cities.sort((a, b) => b.density - a.density); // Sortuj miasta według gęstości
    const fifthCity = cities[4]; // Piąte miasto w posortowanej tablicy
    document.getElementById("fifthCity").innerHTML = `<p>${fifthCity.name}</p>`;
}

// d) Dodanie "city" do nazw miast powyżej 100000 mieszkańców i wyświetlenie ich
function displayCitiesAbove100000(cities) {
    const citiesAbove100000 = cities.filter(city => city.people > 100000)
                                    .map(city => ({ ...city, name: city.name + " city" }));
    citiesAbove100000.forEach(city => {
        document.getElementById("above100000").innerHTML += `<p>${city.name}</p>`;
    });
}

// e) Wyliczenie, czy więcej jest miast powyżej 80000 mieszkańców czy poniżej, z liczbą miast
function compareCitiesAboveBelow80000(cities) {
    const above80000 = cities.filter(city => city.people > 80000).length;
    const below80000 = cities.filter(city => city.people <= 80000).length;

    if (above80000 > below80000) {
        document.getElementById("aboveBelow80000").innerHTML = `<p>Więcej miast powyżej 80000: ${above80000}</p>`;
    } else if (below80000 > above80000) {
        document.getElementById("aboveBelow80000").innerHTML = `<p>Więcej miast poniżej 80000: ${below80000}</p>`;
    } else {
        document.getElementById("aboveBelow80000").innerHTML = `<p>Równa liczba miast powyżej i poniżej 80000</p>`;
    }
}

// f) Obliczenie średniej powierzchni miast z powiatów zaczynających się na literkę "P"
function averageAreaOfCitiesInP(cities) {
    const citiesInP = cities.filter(city => city.township.startsWith("P"));
    const averageArea = citiesInP.reduce((sum, city) => sum + city.area, 0) / citiesInP.length;
    document.getElementById("averageArea").innerHTML = `<p>Średnia powierzchnia miast z powiatów na "P": ${averageArea.toFixed(2)} km²</p>`;
}

// g) Sprawdzenie, czy wszystkie miasta z województwa pomorskiego są większe niż 5000 osób, oraz ich liczba
function checkPomorskieCities(cities) {
    const pomorskieCities = cities.filter(city => city.province === "pomorskie");
    const allGreaterThan5000 = pomorskieCities.every(city => city.people > 5000);
    const count = pomorskieCities.length;

    if (allGreaterThan5000) {
        document.getElementById("pomorskie").innerHTML = `<p>Wszystkie miasta z województwa pomorskiego mają więcej niż 5000 mieszkańców. Liczba miast: ${count}</p>`;
    } else {
        document.getElementById("pomorskie").innerHTML = `<p>Nie wszystkie miasta z województwa pomorskiego mają więcej niż 5000 mieszkańców. Liczba miast: ${count}</p>`;
    }
}

// Ładowanie danych z pliku JSON i wywołanie funkcji
fetch('city.json')
    .then(response => response.json())
    .then(cities => {
        displayMalopolskieCities(cities);
        displayCitiesWithTwoA(cities);
        displayFifthCityByDensity(cities);
        displayCitiesAbove100000(cities);
        compareCitiesAboveBelow80000(cities);
        averageAreaOfCitiesInP(cities);
        checkPomorskieCities(cities);
    })
    .catch(error => console.error('Error loading the JSON file:', error));
