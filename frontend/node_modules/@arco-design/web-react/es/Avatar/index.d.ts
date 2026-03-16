import Avatar from './avatar';
import Group from './group';
export * from './interface';
declare type AvatarComponentType = typeof Avatar & {
    Group: typeof Group;
};
declare const AvatarComponent: AvatarComponentType;
export default AvatarComponent;
