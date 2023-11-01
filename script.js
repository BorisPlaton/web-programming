function traverseDOM(node, callback) {
    callback(node);
    let children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
        traverseDOM(children[i], callback);
    }
}

function askUser(node) {
    if (!node.tagName || !node.firstChild) {
        return 'next';
    }
    let text = node.firstChild.textContent.trim();
    let question = prompt(
        text ?
            `Текст: ${text}\nЭлемент: ${node.tagName}\nПродвинуться ли к следующему узлу? (да/нет/назад)` :
            `Текст: Отсутсвует\nЭлемент: ${node.tagName}\nПродвинуться ли к следующему узлу? (да/нет/назад)`
    );
    if (question === 'да') {
        return 'next';
    } else if (question === 'назад') {
        return 'back';
    } else {
        return 'exit';
    }
}

function startTraverse() {
    let current = document.body;
    let stack = [];
    traverseDOM(current, function (node) {
        let action = askUser(node);
        if (action === 'next') {
            stack.push(current);
            current = node;
        } else if (action === 'back') {
            current = stack.pop();
        }
    });
}

startTraverse();