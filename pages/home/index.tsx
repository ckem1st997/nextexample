import { useNotifications } from '@mantine/notifications';
import { GetServerSidePropsContext } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { authOptions } from '../api/auth/[...nextauth]';
import { useCallback, useReducer, useState } from 'react';



const initialState = { count: 0 };

function reducer(state: { count: number; }, action: { type: any; }) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}


export default function Home() {
  // Trong ví dụ này, hàm add được tạo bằng cách sử dụng useCallback và truyền làm hàm xử lý onClick cho một nút. 
  // useCallback đảm bảo rằng hàm add không được tạo lại trên mỗi lần render, 
  // mà chỉ nếu một trong các phụ thuộc trong tham số thứ hai (một mảng trống trong trường hợp này) thay đổi. 
  // Điều này có thể cải thiện hiệu suất bằng cách tránh lặp lại render và tạo hàm không cần thiết.
  const [numberA, setnumberA] = useState(0);
  const [numberB, setnumberB] = useState(0);
  const add = useCallback((a: number, b: number) => {
    if (a == 0 || b == 0)
      return a + b;
    return a * b;
  }
    ,
    []);
  ///useContext
  // Trong ví dụ này, chúng ta đã tạo một MyContext bằng cách sử dụng React.createContext(). 
  // Sau đó, chúng ta sử dụng useContext trong MyComponent để lấy giá trị đã cung cấp bởi MyContext.Provider trong App.

  // Giá trị mà MyContext.Provider cung cấp là "Hello World", nên khi MyComponent được render, nó sẽ hiển thị "Hello World" trên màn hình.
  // const MyContext = React.createContext();

  // function MyComponent() {
  //   const value = useContext(MyContext);

  //   return <div>{value}</div>;
  // }

  // function App() {
  //   return (
  //     <MyContext.Provider value="Hello World">
  //       <MyComponent />
  //     </MyContext.Provider>
  //   );
  //useReducer
  // Trong ví dụ này, chúng ta đã khai báo một reducer với một trạng thái ban đầu là { count: 0 } và hai action là 'increment' và 'decrement'. 
  // Sau đó, chúng ta sử dụng useReducer trong Counter để khởi tạo trạng thái và dispatch action. Khi người dùng nhấn vào nút "+" hoặc "-", 
  // chúng ta sẽ gửi một action tương ứng với reducer để cập nhật lại trạng thái. Trạng thái mới sẽ được hiển thị trên màn hình.
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <button onClick={() => {
        setnumberA(numberA + 1);
        setnumberB(numberB + 1)
        console.log(add(numberA, numberB))

      }

      }>Click me</button>

      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
  // }
  // return <div>Access Denied</div>
}

