export default function useShowFooter(props) {
    var title = props.title, description = props.description, actions = props.actions;
    var showCaption = title || description;
    var showActions = actions && actions.length;
    var showFooter = showCaption || showActions;
    return [showFooter, showCaption, showActions];
}
