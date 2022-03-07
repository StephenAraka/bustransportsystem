const getGreeting = () => {
  const hours = new Date().getHours();
  let greeting = "";

  if (hours < 12)
    greeting = 'Good morning,';
  else if (hours >= 12 && hours < 17)
    greeting = 'Good afternoon,';
  else if (hours >= 17 && hours <= 24)
    greeting = 'Good evening,';

  return greeting;
}

export default getGreeting;
