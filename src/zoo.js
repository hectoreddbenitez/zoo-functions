const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return ids.map((id) => data.species.find((species) => species.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const especielSlecionada = data.species.find((species) => species.name === animal);
  return especielSlecionada.residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(
    (employee) => employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    ...personalInfo,
    ...associatedWith,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newemployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newemployee);
}

function countAnimals(species) {
  if (species === undefined) {
    return data.species.reduce((acc, especie) => {
      acc[especie.name] = especie.residents.length;
      return acc;
    }, {});
  }
  const especielSlecionada = data.species.find((animal) => animal.name === species);
  return especielSlecionada.residents.length;
}

function calculateEntry(entrants = {}) {
  // Obrigado Jonathan e Julio por me lembrar do objetc.entries!
  const visitantes = Object.entries(entrants);

  return visitantes.reduce((acc, visitante) =>
    acc + data.prices[visitante[0]] * visitante[1], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

// Obrigado Jonathan, mais uma vez!
function getDayentry(dayName) {
  const horario = {};
  const {
    open,
    close,
  } = data.hours[dayName];
  horario[dayName] = dayName === 'Monday' ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`;
  return horario;
}

function getSchedule(dayName) {
  if (!dayName) {
    const cronograma = Object.entries(data.hours);
    return cronograma.reduce((acc, days) => ({
      ...acc,
      ...getDayentry(days[0]),
    }), {});
  }
  return getDayentry(dayName);
}

function getOldestFromFirstSpecies(id) {
  const animalId = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const arrayResidentes = data.species
    .find((animal) => animal.id === animalId).residents
    .sort((residentA, residentB) => residentB.age - residentA.age);
  return Object.values(arrayResidentes[0]);
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
