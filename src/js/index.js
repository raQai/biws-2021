for (const style of document.querySelectorAll('link[rel="preload"][as="style"]')) {
    style.rel = "stylesheet";
}

biws.stickyParallax({ containerSelector: ".bullets" });

setTimeout(() => {
    const css = {
        s: 'yEcNoT',
        e: 'EoauyE',
        p: 'PyHCah'
    },
        contact = {
            r: "abersreere abbcrare",
            e: {
                m: "znvygb",
                l: "Ivn R-Znvy xbagnxgvrera",
                n: "vasb",
                d: "obtqna-vjf",
                t: "pbz",
            },
            p: {
                t: "gry",
                l: "Naehsra",
                a: "+94",
                p: "1606",
                n: ["436", "2475"]
            }
        },
        rot13 = str => str
            .replace(/[a-zA-Z]/g, c => String
                .fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)),
        rot5 = str => str
            .replace(/\d/g, c => String
                .fromCharCode(57 >= (c = c.charCodeAt(0) + 5) ? c : c - 10));

    window.requestAnimationFrame(() => {
        for (const element of document.querySelectorAll(`.${css.s}`)) {
            const classList = element.classList,
                isLink = classList.contains(rot13('yvax')),
                parent = element.parentElement,
                child = document.createElement(rot13(isLink ? 'n' : 'fcna'));

            let href, label, text;
            if (classList.contains(css.e)) {
                const mail = `${contact.e.n}@${contact.e.d}.${contact.e.t}`;
                text = document.createTextNode(rot13(mail));
                href = `${rot13(contact.e.m)}:${rot13(mail)}`;
                label = rot13(contact.e.l);
            } else if (classList.contains(css.p)) {
                const phoneText = `${contact.p.a} (5) ${contact.p.p} - ${contact.p.n.join(' ')}`,
                    phone = `${contact.p.a}${contact.p.p}${contact.p.n.join('')}`;
                text = document.createTextNode(rot5(phoneText));
                href = `${rot13(contact.p.t)}:${rot5(phone)}`;
                label = rot13(contact.p.l);
            }
            if (isLink) {
                child.setAttribute(rot13('uers'), href);
                child.setAttribute(rot13('nevn-ynory'), label);
                child.setAttribute(rot13('ery'), rot13(contact.r));
            }
            child.append(text);
            parent.removeChild(element);
            parent.append(child);
        }
    })
}, 3000);