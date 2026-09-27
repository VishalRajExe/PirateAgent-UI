"use client";
import { useState } from "react";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const THEMES = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "system", label: "System", icon: Monitor },
] as const;

export default function SettingsPage() {
  const [theme, setTheme] = useState<(typeof THEMES)[number]["key"]>("light");
  const [defaultSourceCap, setDefaultSourceCap] = useState("50");
  const [autoDedupe, setAutoDedupe] = useState(true);

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Settings</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">Manage your profile and how PIRATEAGENT behaves.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="space-y-5 p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="text-base">VR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[14px] font-medium">Vishal Raj</p>
                  <p className="text-[12.5px] text-muted-foreground">vishal@pirateagent.ai</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullname">Full name</Label>
                  <Input id="fullname" defaultValue="Vishal Raj" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="vishal@pirateagent.ai" />
                </div>
              </div>
              <Button size="sm">Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardContent className="p-5">
              <p className="mb-3 text-[13px] font-medium">Theme</p>
              <div className="grid grid-cols-3 gap-3">
                {THEMES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                      theme === t.key ? "border-primary bg-primary-soft" : "border-border hover:bg-muted"
                    )}
                  >
                    <t.icon className={cn("h-4.5 w-4.5", theme === t.key ? "text-primary" : "text-muted-foreground")} />
                    <span className="flex items-center gap-1 text-[12.5px] font-medium">
                      {t.label}
                      {theme === t.key && <Check className="h-3 w-3 text-primary" />}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardContent className="space-y-5 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[13px] font-medium">Auto-remove duplicates</p>
                  <p className="text-[12.5px] text-muted-foreground">Automatically merge near-duplicate records during collection.</p>
                </div>
                <button
                  onClick={() => setAutoDedupe((v) => !v)}
                  className={cn("h-6 w-10 shrink-0 rounded-full transition-colors", autoDedupe ? "bg-primary" : "bg-muted")}
                >
                  <span className={cn("block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-subtle transition-transform", autoDedupe && "translate-x-4.5")} />
                </button>
              </div>
              <Separator />
              <div className="space-y-1.5">
                <Label htmlFor="cap">Default source cap per workflow</Label>
                <Input id="cap" type="number" value={defaultSourceCap} onChange={(e) => setDefaultSourceCap(e.target.value)} className="max-w-[140px]" />
                <p className="text-[12px] text-muted-foreground">Maximum number of sources a new workflow will check by default.</p>
              </div>
              <Button size="sm">Save preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
