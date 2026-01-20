// 3. Создать функцию, которая принимает 2 числа и возвращает их сумму. Полностью типизировать параметры, значение, возвращаемое функцией.

function sum(a: number, b: number): number {
  return a + b;
}

// 4. Создать переменную status, которая может быть только: "loading", "success", "error".

let statuss: "loading" | "success" | "error";

// 5. Создать переменную textFormat, которая может быть только: 'uppercase', 'lowercase', 'capitalize'".

let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

// 6. Создать интерфейс, который описывает юзера. Поля на ваш выбор. Одно поле должно быть опциональным.

interface IUser {
  name: string;
  age: number;
  city: string;
  email?: string;
  phone: number;
}

// 7. Создать интерфейс, который расширяется интерфейсом User с задания №6 и имеет свои дополнительные поля 

interface IStudent extends IUser {
  faculty: string;
  specialization: string;
}

// 8. Создать функцию, которая принимает строку и вариант,  как именно форматировать строку (задание №5) и на основе этого возвращает форматированную строку.

function changeText(text: string, format: 'uppercase' | 'lowercase' | 'capitalize'): string {
  if (format === 'uppercase') {
    return text.toUpperCase();
  } else if (format === 'lowercase') {
    return text.toLowerCase();
  } else {
    return text.replace(/^./, char => char.toUpperCase());
  }
}

// 9. Создать функцию, которая принимает строку и символ, возвращает строку без переданного символа.  (есть специальные методы для этого, гуглим)

function removeCharacter(text: string, character: string): string {
  return text.split(character).join('');
}

// 10. Создать массив объектов на основе интерфейса с задания №6. Отфильтровать его по одному из параметров

const users: IUser[] = [
  {
    name: 'Garry',
    age: 17,
    city: 'London',
    phone: 123456789,
  },
  {
    name: 'Ronald',
    age: 17,
    city: 'The fox hole',
    phone: 564231897,
  },
  {
    name: 'Tom',
    age: 35,
    city: 'Little Hangleton',
    phone: 879546213,
  }
]

const filterUsers: IUser[] = users.filter((user: IUser) => user.age === 17);