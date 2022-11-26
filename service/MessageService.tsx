import { ResultMessageResponse } from "../model/ResultMessageResponse";
import { VendorDTO } from "../model/VendorDTO";
import axios from 'axios';
import { showNotification, updateNotification } from '@mantine/notifications';
import { UnitDTO } from '../model/UnitDTO';
import { Icon2fa, IconAccessPoint, IconCheck,IconInbox,IconInfoCircle,IconX } from "@tabler/icons";

var baseUrl = "http://localhost:5005/api/v1";
// showNotification({
//   id: 'hello-there',
//   disallowClose: true,
//   // onClose: () => console.log('unmounted'),
//   // onOpen: () => console.log('mounted'),
//   autoClose: 5000,
//   title: "Thông báo",
//   message: 'Leave the building immediately',
//   color: 'green',
//   icon: <IconX />,
//   className: 'my-notification-class',
//   style: { backgroundColor: 'red' },
//   sx: { backgroundColor: 'red' },
//   loading: false,
// });
export const MessageService = {
  Success,
  Fails,
  Info,
  Warn,
  LoadingShow,
  LoadingHidden,
  SuccessTime
};

function Success(noti: string) {
  showNotification({
    title: 'Thông báo',
    message: noti,
    icon: <IconCheck />,
    color: 'green'
  });

}
function SuccessTime(noti: string, url:string) {
  showNotification({
    onClose: () => {window.location.href = url},
    autoClose: 1000,
    title: 'Thông báo',
    message: noti,
    icon: <IconCheck />,
    color: 'green'
  });

}
function Fails(noti: string) {
  showNotification({
    title: 'Thông báo',
    message: noti,
    icon: <IconX />,
    color: 'red'
  });
}

function Info(noti: string) {
  showNotification({
    title: 'Thông báo',
    message: noti,
    icon: <IconInfoCircle />,
    color: 'blue'
  });
}

function Warn(noti: string) {
  showNotification({
    title: 'Thông báo',
    message: noti,
    icon: <IconAccessPoint />,
    color: 'orange'
  });
}


function LoadingShow() {
  showNotification({
    id: 'load-data',
    loading: true,
    title: 'Loading your data',
    message: 'Data will be loaded in 3 seconds, you cannot close this yet',
    autoClose: 5000,
    disallowClose: true,
  });
}
function LoadingHidden() {
  updateNotification({
    id: 'load-data',
    color: 'teal',
    title: 'Data was loaded',
    message: 'Notification will close in 2 seconds, you can close this notification now',
    //   icon: <Icon2fa />,
    autoClose: 3000,
  });
}
