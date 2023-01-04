export const messageTypes = [
  { value: "user", label: "Individual" },
  { value: "group", label: "Group" },
];

export interface optionInterface {
  label: string;
  value: string;
}

export interface NewChat {
  message: string;
  users: Array<optionInterface>;
  selectedUsers: Array<optionInterface>;
  groupName?: string;
}

export const defaultProfilePic =
  "https://www.w3schools.com/howto/img_avatar.png";
// export const defaultProfilePic = "../../../assets/images/avatar.png";
