import { TextareaRenderable, type KeyBinding } from "@opentui/core"
import { StatusBar } from "./status-bar"
import { CommandMenu } from "./command-menu"
import { useCallback, useEffect, useRef } from "react"
import { useRenderer } from "@opentui/react"
import { useCommandMenu } from "./command-menu/use-command-menu";
import type { Command } from "./command-menu/types"

type props = {
    onSubmit: (value: string) => void,
    disabled?: boolean
}

export const TEXTAREA_KEY_BINDINGS: KeyBinding[] = [
    { name: "return", action: "submit" },
    { name: "enter", action: "submit" },
    { name: "return", shift: true, action: "newline" },
    { name: "enter", shift: true, action: "newline" }
]

export function InputBar({ onSubmit, disabled }: props) {
    const textarearef = useRef<TextareaRenderable>(null)
    const onSubmitRef = useRef<() => void>(() => { });
    const renderer = useRenderer()

    const {
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,
        setSelectedIndex,
    } = useCommandMenu();

    const handleCommandExecute = useCallback((index: number) => {
        const command = resolveCommand(index);
        handleCommand(command)
    }, [])

    const handleTextareaContentChange = useCallback(() => {
        const textarea = textarearef.current;
        if (!textarea) return;
        handleContentChange(textarea.plainText);
    }, [])

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        const textarea = textarearef.current;
        if (!textarea) return;

        const text = textarea.plainText.trim()
        if (text.length === 0) return

        onSubmit(text);
        textarea.setText("");
    }, [disabled, onSubmit]);

    const handleCommand = useCallback((command: Command | undefined) => {
        const textarea = textarearef.current;
        if (!textarea || !command) return;

        textarea.setText("");
        if (command.action) {
            command.action({
                exit: () => renderer.destroy(),
            })
        }
        else {
            textarea.insertText(command.value + " ");
        }

    }, [renderer]);

    useEffect(() => {
        const textarea = textarearef.current;
        if (!textarea) return;

        textarea.onSubmit = () => {
            onSubmitRef.current();
        }
    }, [onSubmit]);

    onSubmitRef.current = () => {
        if (disabled) return;

        if (showCommandMenu) {
            const command = resolveCommand(selectedIndex);
            handleCommand(command)
            return
        }
        handleSubmit()
    };

    return (
        <box flexDirection="row" gap={1}>
            <box>
                <box
                    position="relative"
                    justifyContent="center"
                    paddingX={2}
                    paddingY={1}
                    backgroundColor="#12121A"
                    width={"100%"}
                    gap={1}
                >
                    {showCommandMenu && (
                        <box
                            position="absolute"
                            bottom={"100%"}
                            left={0}
                            width={"100%"}
                            backgroundColor="#12121A"
                            zIndex={10}
                        >
                            <CommandMenu
                                query={commandQuery}
                                selectedIndex={selectedIndex}
                                scrollRef={scrollRef}
                                onSelect={setSelectedIndex}
                                onExecute={handleCommandExecute}
                            />
                        </box>

                    )}
                    <textarea
                        ref={textarearef}
                        minWidth={78}
                        focused={!disabled}
                        keyBindings={TEXTAREA_KEY_BINDINGS}
                        onContentChange={handleTextareaContentChange}
                        placeholder={
                            "What would you like to build?"
                        }
                    />
                    <StatusBar />
                </box>
            </box>
        </box>
    )
}